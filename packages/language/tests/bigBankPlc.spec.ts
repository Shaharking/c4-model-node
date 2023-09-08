import { Workspace, Model, SoftwareSystem, Container, DeploymentEnvironment, DeploymentNode, InfrastructureNode, ContainerInstance, Include, AutoLayout, Animation, Styles, Theme, Relationship, DeploymentView, ElementStyle, Tags, Person, Group, Component, SoftwareSystemInstance, SystemLandscapeView, SystemContextView, Description, Properties, ContainerView, ComponentView, ImageView, ImageViewImage, Title, DynamicView } from '../src';
import { prettify } from '../src/shared/iserializeable';
import { Themes } from '../src/views/themes';
import * as fs from 'fs/promises';

const workspace = new Workspace({
    name: 'Big Bank plc',
    description: "This is an example workspace to illustrate the key features of Structurizr, via the DSL, based around a fictional online banking system."
});

const modelEntities = [
    new Person({ id: 'customer', name: 'Personal Banking Customer', description: "A customer of the bank, with personal bank accounts.", tags: ["Customer"]}),
    
    new Group({
        name: "Big Bank plc",
        children: [
            new Person({ id: "supportStaff", name: "Customer Service Staff", description: "Customer service staff within the bank.", tags: ["Bank Staff"]}),
            new Person({id: "backoffice", name: "Back Office Staff", description: "Administration and support staff within the bank.", tags: ["Bank Staff"]}),
            new SoftwareSystem({id: "mainframe", name: "Mainframe Banking System", description: "Stores all of the core banking information about customers, accounts, transactions, etc.", tags: ["Existing System"]}),
            new SoftwareSystem({id: "email", name: "E-mail System", description: "The internal Microsoft Exchange e-mail system.", tags:["Existing System"]}),
            new SoftwareSystem({id: "atm", name: "ATM", description: "Allows customers to withdraw cash.", tags: ["Existing System"]}),
            new SoftwareSystem({
                id: "internetBankingSystem", 
                name: "Internet Banking System",
                description: "Allows customers to view information about their bank accounts, and make payments.", 
                children: [
                    new Container({id: "singlePageApplication", name: "Single-Page Application", description: "Provides all of the Internet banking functionality to customers via their web browser.", technology: "JavaScript and Angular", tags: ["Web Browser"]}),
                    new Container({id: "mobileApp ", name: "Mobile App", description: "Provides a limited subset of the Internet banking functionality to customers via their mobile device.", technology: "Xamarin", tags:["Mobile App"]}),
                    new Container({id: "webApplication", name: "Web Application", description: "Delivers the static content and the Internet banking single page application.", technology: "Java and Spring MVC" }),
                    new Container({
                        id: "apiApplication", 
                        name: "API Application", 
                        description: "Provides Internet banking functionality via a JSON/HTTPS API.",
                        technology: "Java and Spring MVC", 
                        children: [
                           new Component({id: "signinController", name: "Sign In Controller", description: "Allows users to sign in to the Internet Banking System.", technology: "Spring MVC Rest Controller"}),
                           new Component({id: "accountsSummaryController", name: "Accounts Summary Controller", description: "Provides customers with a summary of their bank accounts.", technology: "Spring MVC Rest Controller"}),
                           new Component({id: "resetPasswordController", name: "Reset Password Controller", description: "Allows users to reset their passwords with a single use URL.", technology: "Spring MVC Rest Controller" }),
                           new Component({id: "securityComponent", name: "Security Component", description: "Provides functionality related to signing in, changing passwords, etc.", technology: "Spring Bean" }),
                           new Component({id: "mainframeBankingSystemFacade", name: "Mainframe Banking System Facade", description: "A facade onto the mainframe banking system.", technology: "Spring Bean" }),
                           new Component({id: "emailComponent", name: "E-mail Component", description: "Sends e-mails to users.", technology: "Spring Bean" })
                        ]
                    }),
                    new Container({id: "database", name: "Database", description: "Stores user registration information, hashed authentication credentials, access logs, etc.", technology: "Oracle Database Schema", tags: ["Database"]}),                  
                ]
            })

        ]
    })
]


const modelRelationships = [
    // relationships between people and software systems
    new Relationship({ sourceId: "customer", destinationId: "internetBankingSystem", description: "Views account balances, and makes payments using"}),
    new Relationship({sourceId: "internetBankingSystem", destinationId: "mainframe", description: "Gets account information from, and makes payments using" }),
    new Relationship({sourceId: "internetBankingSystem", destinationId: "email", description: "Sends e-mail using"}),
    new Relationship({ sourceId: "email", destinationId: "customer", description: "Sends e-mails to" }),
    new Relationship({sourceId: "customer", destinationId: "supportStaff", description: "Asks questions to", technology: "Telephone"}),
    new Relationship({ sourceId: "supportStaff", destinationId: "mainframe", description: "Uses" }),
    new Relationship({ sourceId: "customer", destinationId: "atm", description: "Withdraws cash using" }),
    new Relationship({ sourceId: "atm", destinationId: "mainframe", description: "Uses" }),
    new Relationship({ sourceId: "backoffice", destinationId: "mainframe", description: "Uses" }),

    // Relationships to/from containers
    new Relationship({ sourceId: "customer", destinationId: "webApplication", description: "Visits bigbank.com/ib using", technology: "HTTPS" }),
    new Relationship({ sourceId: "customer", destinationId: "singlePageApplication", description: "Views account balances, and makes payments using" }),
    new Relationship({ sourceId: "customer", destinationId: "mobileApp", description: "Views account balances, and makes payments using" }),
    new Relationship({ sourceId: "webApplication", destinationId: "singlePageApplication", description: "Delivers to the customer's web browser" }),

    // Relationships to/from components
    new Relationship({ sourceId: "singlePageApplication", destinationId: "signinController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "singlePageApplication", destinationId: "accountsSummaryController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "singlePageApplication", destinationId: "resetPasswordController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "mobileApp", destinationId: "signinController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "mobileApp", destinationId: "accountsSummaryController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "mobileApp", destinationId: "resetPasswordController", description: "Makes API calls to", technology: "JSON/HTTPS" }),
    new Relationship({ sourceId: "signinController", destinationId: "securityComponent", description: "Uses" }),
    new Relationship({ sourceId: "accountsSummaryController", destinationId: "mainframeBankingSystemFacade", description: "Uses" }),
    new Relationship({ sourceId: "resetPasswordController", destinationId: "securityComponent", description: "Uses" }),
    new Relationship({ sourceId: "resetPasswordController", destinationId: "emailComponent", description: "Uses" }),
    new Relationship({ sourceId: "securityComponent", destinationId: "database", description: "Reads from and writes to", technology: "SQL/TCP" }),
    new Relationship({ sourceId: "mainframeBankingSystemFacade", destinationId: "mainframe", description: "Makes API calls to", technology: "XML/HTTPS" }),
    new Relationship({ sourceId: "emailComponent", destinationId: "email", description: "Sends e-mail using" }),
]

const modelDeploymentEnviorment = [
    new DeploymentEnvironment({
        name: "Development",
        children: [
            new DeploymentNode({
                name: "Developer Laptop",
                technology: "Microsoft Windows 10 or Apple macOS",
                children: [
                    new DeploymentNode({ 
                        name: "Web Browser",
                        technology: "Chrome, Firefox, Safari, or Edge",
                        children: [
                            new ContainerInstance({
                                id: "developerSinglePageApplicationInstance",
                                identifier: "singlePageApplication"
                            }),
                        ]
                    }),
                    new DeploymentNode({
                        name: "Docker Container - Web Server",
                        technology: "Docker",
                        children: [
                            new DeploymentNode({
                                name: "Apache Tomcat",
                                technology: "Apache Tomcat 8.x",
                                children: [
                                    new ContainerInstance({
                                        id: "developerWebApplicationInstance",
                                        identifier: "webApplication"
                                    }),
                                    new ContainerInstance({
                                        id: "developerApiApplicationInstance",
                                        identifier: "apiApplication"
                                    })
                                ]
                            })
                        ]
                    }),
                    new DeploymentNode({
                        name: "Docker Container - Database Server",
                        technology: "Docker",
                        children: [
                            new DeploymentNode({
                                name: "Database Server",
                                technology: "Oracle 12c",
                                children: [
                                    new ContainerInstance({
                                        id: "developerDatabaseInstance",
                                        identifier: "database"
                                    })
                                ]
                            })
                        ]
                    }), 
                ]
            }),
            new DeploymentNode({
                name: "Big Bank plc",
                technology: "Big Bank plc data center",
                children: [
                    new DeploymentNode({
                        name: "bigbank-dev001",
                        children: [
                            new SoftwareSystemInstance({
                                identifier: "mainframe"
                            })
                        ]
                    })
                ]
            })
        ]
    }),
    new DeploymentEnvironment({
        name: "Live",
        children: [
            new DeploymentNode({
                name: "Customer's mobile device",
                technology: "Apple iOS or Android",
                children: [
                    new ContainerInstance({
                        id: "liveMobileAppInstance",
                        identifier: "mobileApp"
                    })
                ]
            }),
            new DeploymentNode({
                name: "Customer's computer",
                technology: "Microsoft Windows or Apple macOS",
                children: [
                    new DeploymentNode({
                        name: "Web Browser",
                        technology: "Chrome, Firefox, Safari, or Edge",
                        children: [
                            new ContainerInstance({
                                id: "liveSinglePageApplicationInstance",
                                identifier: "singlePageApplication"
                            })
                        ]
                    })
                ]
            }),
            new DeploymentNode({
                name: "Big Bank plc",
                technology: "Big Bank plc data center",
                children: [
                    new DeploymentNode({
                        name: "bigbank-web***",
                        technology: "Ubuntu 16.04 LTS",
                        instances: "4",
                        children: [
                            new DeploymentNode({
                                name: "Apache Tomcat",
                                technology: "Apache Tomcat 8.x",
                                children: [
                                    new ContainerInstance({
                                        id: "liveWebApplicationInstance",
                                        identifier: "webApplication"
                                    })
                                ]
                            })
                        ]
                    }),
                    new DeploymentNode({
                        name: "bigbank-api***",
                        technology: "Ubuntu 16.04 LTS",
                        instances: "8",
                        children: [
                            new DeploymentNode({
                                name: "Apache Tomcat",
                                technology: "Apache Tomcat 8.x",
                                children: [
                                    new ContainerInstance({
                                        id: "liveApiApplicationInstance",
                                        identifier: "apiApplication"
                                    })
                                ]
                            })
                        ]
                    }),
                    new DeploymentNode({
                        name: "bigbank-db01",
                        technology: "Ubuntu 16.04 LTS",
                        children: [
                            new DeploymentNode({
                                id: "primaryDatabaseServer",
                                name: "Oracle - Primary",
                                technology: "Oracle 12c",
                                children: [
                                    new ContainerInstance({
                                        id: "livePrimaryDatabaseInstance",
                                        identifier: "database"
                                    })
                                ]
                            })
                        ]
                    }),
                    new DeploymentNode({
                        name: "bigbank-db02",
                        technology: "Ubuntu 16.04 LTS",
                        instances: "2",
                        children: [
                            new DeploymentNode({
                                id: "secondaryDatabaseServer",
                                name: "Oracle - Secondary",
                                technology: "Oracle 12c",
                                tags: ["Failover"],
                                children: [
                                    new ContainerInstance({
                                        id: "liveSecondaryDatabaseInstance",
                                        identifier: "database",
                                        deploymentGroups: ["Failover"]
                                    })
                                ]
                            })
                        ]
                    }),
                    new DeploymentNode({
                        name: "bigbank-prod001",
                        children: [
                            new SoftwareSystemInstance({
                                identifier: "mainframe"
                            })
                        ]
                    })
                ]
            }),
            new Relationship({
                sourceId: "primaryDatabaseServer",
                destinationId: "secondaryDatabaseServer",
                description: "Replicates data to"
            })
        ]
    })
]

workspace.addModelChildrens([
    ...modelEntities,
    ...modelRelationships,
    ...modelDeploymentEnviorment
]);

//Views
const landscape = new SystemLandscapeView({
    key: "SystemLandscape",
    children: [
        new Include({identifierOrExpression: ["*"]}),
        new AutoLayout()
    ]
})

const systemContextView = new SystemContextView({
    softwareSystem: "internetBankingSystem",
    key: "SystemContext",
    children: [
        new Include({ identifierOrExpression: ["*"]}),
        new Animation({
            identifier: [
                "internetBankingSystem",
                "customer",
                "mainframe",
                "email",
            ]
        }),
        new AutoLayout(),
        new Description("The system context diagram for the Internet Banking System."),
        new Properties({
            "structurizr.groups": "false"
        })
    ]
})

const containerViews = [
    new ContainerView({
        softwareSystem: "internetBankingSystem",
        key: "Containers",
        children: [
            new Include({ identifierOrExpression: ["*"]}),
            new Animation({
                identifier: [
                    "customer",
                    "mainframe",
                    "email",
                    "webApplication",
                    "singlePageApplication",
                    "mobileApp",
                    "apiApplication",
                    "database",
                ]
            }),
            new AutoLayout(),
            new Description("The container diagram for the Internet Banking System.")
        ]
    })
]

const componentsViews = [
    new ComponentView({
        container: "apiApplication",
        key: "Components",
        children: [
            new Include({ identifierOrExpression: ["*"]}),
            new Animation({
                identifier: [
                    "singlePageApplication",
                    "mobileApp", 
                    "database", 
                    "email", 
                    "mainframe",
                    "signinController", 
                    "securityComponent",
                    "accountsSummaryController", 
                    "mainframeBankingSystemFacade",
                    "resetPasswordController", 
                    "emailComponent",
                ]
            }),
            new AutoLayout(),
            new Description("The component diagram for the API Application.")
        ]
    })
]

const imagesViews = [
    new ImageView({
        elementIdentifier: "mainframeBankingSystemFacade",
        key: "MainframeBankingSystemFacade",
        children: [
           new ImageViewImage({
            fileUrl: "https://raw.githubusercontent.com/structurizr/examples/main/dsl/big-bank-plc/internet-banking-system/mainframe-banking-system-facade.png",
            type: 'image'
           }),
           new Title({ title: "[Code] Mainframe Banking System Facade" })
        ]
    })
]

const dynamicViews = [
    new DynamicView({
        scope: "apiApplication",
        key: "SignIn",
        description: "Summarises how the sign in feature works in the single-page application.",
        children: [
            new Relationship({
                sourceId: "singlePageApplication",
                destinationId: "signinController",
                description: "Submits credentials to"
            }),
            new Relationship({
                sourceId: "signinController",
                destinationId: "securityComponent",
                description: "Validates credentials using"
            }),
            new Relationship({
                sourceId: "securityComponent",
                destinationId: "database",
                description: "select * from users where username = ?"
            }),
            new Relationship({
                sourceId: "database",
                destinationId: "securityComponent",
                description: "Returns user data to"
            }),
            new Relationship({
                sourceId: "securityComponent",
                destinationId: "signinController",
                description: "Returns true if the hashed password matches"
            }),
            new Relationship({
                sourceId: "signinController",
                destinationId: "singlePageApplication",
                description: "Sends back an authentication token to"
            }),
            new AutoLayout(),
            new Description("Summarises how the sign in feature works in the single-page application.")
        ] 
    })
]

const deploymentViews = [
    new DeploymentView({
        scope: "internetBankingSystem",
        environment: "Development",
        key: "DevelopmentDeployment",
        children: [
            new Include({ identifierOrExpression: ["*"]}),
            new Animation({
                identifier: [
                    "developerSinglePageApplicationInstance",
                    "developerWebApplicationInstance", 
                    "developerApiApplicationInstance",,
                    "developerDatabaseInstance",,
                ],
            }),
            new AutoLayout(),
            new Description("An example development deployment scenario for the Internet Banking System.")
        ]
    }),

    new DeploymentView({
        scope: "internetBankingSystem",
        environment: "Live",
        key: "LiveDeployment",
        children: [
            new Include({ identifierOrExpression: ["*"]}),
            new Animation({
                identifier: [
                    "liveSinglePageApplicationInstance",
                    "liveMobileAppInstance",
                    "liveWebApplicationInstance", 
                    "liveApiApplicationInstance",
                    "livePrimaryDatabaseInstance",
                    "liveSecondaryDatabaseInstance",
                ]
            }),
            new AutoLayout(),
            new Description("An example live deployment scenario for the Internet Banking System.")
        ]
    }),
]

const viewStyles = new Styles({ children: [
    new ElementStyle({
        tag: "Person",
        children: {
            color: "#ffffff",
            fontSize: "22",
            shape: "Person"
        }
    }),
    new ElementStyle({
        tag: "Customer",
        children: {
            background: "#08427b"
        }
    }),
    new ElementStyle({
        tag: "Bank Staff",
        children: {
            background: "#999999"
        }
    }),
    new ElementStyle({
        tag: "Software System",
        children: {
            background: "#1168bd",
            color: "#ffffff"
        }
    }),
    new ElementStyle({
        tag: "Existing System",
        children: {
            background: "#999999",
            color: "#ffffff"
        }
    }),
    new ElementStyle({
        tag: "Container",
        children: {
            background: "#438dd5",
            color: "#ffffff"
        }
    }),
    new ElementStyle({
        tag: "Web Browser",
        children: {
            shape: "WebBrowser"
        }
    }),
    new ElementStyle({
        tag: "Mobile App",
        children: {
            shape: "MobileDeviceLandscape"
        }
    }),
    new ElementStyle({
        tag: "Database",
        children: {
            shape: "Cylinder"
        }
    }),
    new ElementStyle({
        tag: "Component",
        children: {
            background: "#85bbf0",
            color: "#000000"
        }
    }),
    new ElementStyle({
        tag: "Failover",
        children: {
            opacity: "25"
        }
    })
]
});

workspace.addViewChildrens([
    landscape,
    systemContextView,
    ...containerViews,
    ...componentsViews,
    ...imagesViews,
    ...dynamicViews,
    ...deploymentViews,
    viewStyles
])

const serializedWorkspace = workspace.serialize();
const model = prettify(serializedWorkspace);

describe('Validate Microservice Example', () => {
    it('should serialized correctly', () => {
        expect(model).toEqual(prettify(`workspace "Big Bank plc" "This is an example workspace to illustrate the key features of Structurizr, via the DSL, based around a fictional online banking system."  {

            model {
        
                customer = person "Personal Banking Customer" "A customer of the bank, with personal bank accounts." "Customer"
                group "Big Bank plc" {
        
                    supportStaff = person "Customer Service Staff" "Customer service staff within the bank." "Bank Staff"
                    backoffice = person "Back Office Staff" "Administration and support staff within the bank." "Bank Staff"
                    mainframe = softwaresystem "Mainframe Banking System" "Stores all of the core banking information about customers, accounts, transactions, etc." "Existing System"
                    email = softwaresystem "E-mail System" "The internal Microsoft Exchange e-mail system." "Existing System"
                    atm = softwaresystem "ATM" "Allows customers to withdraw cash." "Existing System"
                    internetBankingSystem = softwaresystem "Internet Banking System" "Allows customers to view information about their bank accounts, and make payments." "" {
        
                        singlePageApplication = container "Single-Page Application" "Provides all of the Internet banking functionality to customers via their web browser." "JavaScript and Angular" "Web Browser"
                        mobileApp  = container "Mobile App" "Provides a limited subset of the Internet banking functionality to customers via their mobile device." "Xamarin" "Mobile App"
                        webApplication = container "Web Application" "Delivers the static content and the Internet banking single page application." "Java and Spring MVC" ""
                        apiApplication = container "API Application" "Provides Internet banking functionality via a JSON/HTTPS API." "Java and Spring MVC" "" {
        
                            signinController = component "Sign In Controller" "Allows users to sign in to the Internet Banking System." "Spring MVC Rest Controller" ""
                            accountsSummaryController = component "Accounts Summary Controller" "Provides customers with a summary of their bank accounts." "Spring MVC Rest Controller" ""
                            resetPasswordController = component "Reset Password Controller" "Allows users to reset their passwords with a single use URL." "Spring MVC Rest Controller" ""
                            securityComponent = component "Security Component" "Provides functionality related to signing in, changing passwords, etc." "Spring Bean" ""
                            mainframeBankingSystemFacade = component "Mainframe Banking System Facade" "A facade onto the mainframe banking system." "Spring Bean" ""
                            emailComponent = component "E-mail Component" "Sends e-mails to users." "Spring Bean" ""
        
                        }
                        database = container "Database" "Stores user registration information, hashed authentication credentials, access logs, etc." "Oracle Database Schema" "Database"
        
                    }
        
                }
                "customer" -> internetBankingSystem "Views account balances, and makes payments using" "" ""
                "internetBankingSystem" -> mainframe "Gets account information from, and makes payments using" "" ""
                "internetBankingSystem" -> email "Sends e-mail using" "" ""
                "email" -> customer "Sends e-mails to" "" ""
                "customer" -> supportStaff "Asks questions to" "Telephone" ""
                "supportStaff" -> mainframe "Uses" "" ""
                "customer" -> atm "Withdraws cash using" "" ""
                "atm" -> mainframe "Uses" "" ""
                "backoffice" -> mainframe "Uses" "" ""
                "customer" -> webApplication "Visits bigbank.com/ib using" "HTTPS" ""
                "customer" -> singlePageApplication "Views account balances, and makes payments using" "" ""
                "customer" -> mobileApp "Views account balances, and makes payments using" "" ""
                "webApplication" -> singlePageApplication "Delivers to the customer's web browser" "" ""
                "singlePageApplication" -> signinController "Makes API calls to" "JSON/HTTPS" ""
                "singlePageApplication" -> accountsSummaryController "Makes API calls to" "JSON/HTTPS" ""
                "singlePageApplication" -> resetPasswordController "Makes API calls to" "JSON/HTTPS" ""
                "mobileApp" -> signinController "Makes API calls to" "JSON/HTTPS" ""
                "mobileApp" -> accountsSummaryController "Makes API calls to" "JSON/HTTPS" ""
                "mobileApp" -> resetPasswordController "Makes API calls to" "JSON/HTTPS" ""
                "signinController" -> securityComponent "Uses" "" ""
                "accountsSummaryController" -> mainframeBankingSystemFacade "Uses" "" ""
                "resetPasswordController" -> securityComponent "Uses" "" ""
                "resetPasswordController" -> emailComponent "Uses" "" ""
                "securityComponent" -> database "Reads from and writes to" "SQL/TCP" ""
                "mainframeBankingSystemFacade" -> mainframe "Makes API calls to" "XML/HTTPS" ""
                "emailComponent" -> email "Sends e-mail using" "" ""
                deploymentEnvironment "Development" {
        
                    deploymentNode "Developer Laptop" "" "Microsoft Windows 10 or Apple macOS" "" "1" {
        
                        deploymentNode "Web Browser" "" "Chrome, Firefox, Safari, or Edge" "" "1" {
        
                            developerSinglePageApplicationInstance = containerInstance "singlePageApplication" "" ""
        
                        }
                        deploymentNode "Docker Container - Web Server" "" "Docker" "" "1" {
        
                            deploymentNode "Apache Tomcat" "" "Apache Tomcat 8.x" "" "1" {
        
                                developerWebApplicationInstance = containerInstance "webApplication" "" ""
                                developerApiApplicationInstance = containerInstance "apiApplication" "" ""
        
                            }
        
                        }
                        deploymentNode "Docker Container - Database Server" "" "Docker" "" "1" {
        
                            deploymentNode "Database Server" "" "Oracle 12c" "" "1" {
        
                                developerDatabaseInstance = containerInstance "database" "" ""
        
                            }
        
                        }
        
                    }
                    deploymentNode "Big Bank plc" "" "Big Bank plc data center" "" "1" {
        
                        deploymentNode "bigbank-dev001" "" "" "" "1" {
        
                            softwareSystemInstance "mainframe" "" ""
        
                        }
        
                    }
        
                }
                deploymentEnvironment "Live" {
        
                    deploymentNode "Customer's mobile device" "" "Apple iOS or Android" "" "1" {
        
                        liveMobileAppInstance = containerInstance "mobileApp" "" ""
        
                    }
                    deploymentNode "Customer's computer" "" "Microsoft Windows or Apple macOS" "" "1" {
        
                        deploymentNode "Web Browser" "" "Chrome, Firefox, Safari, or Edge" "" "1" {
        
                            liveSinglePageApplicationInstance = containerInstance "singlePageApplication" "" ""
        
                        }
        
                    }
                    deploymentNode "Big Bank plc" "" "Big Bank plc data center" "" "1" {
        
                        deploymentNode "bigbank-web***" "" "Ubuntu 16.04 LTS" "" "4" {
        
                            deploymentNode "Apache Tomcat" "" "Apache Tomcat 8.x" "" "1" {
        
                                liveWebApplicationInstance = containerInstance "webApplication" "" ""
        
                            }
        
                        }
                        deploymentNode "bigbank-api***" "" "Ubuntu 16.04 LTS" "" "8" {
        
                            deploymentNode "Apache Tomcat" "" "Apache Tomcat 8.x" "" "1" {
        
                                liveApiApplicationInstance = containerInstance "apiApplication" "" ""
        
                            }
        
                        }
                        deploymentNode "bigbank-db01" "" "Ubuntu 16.04 LTS" "" "1" {
        
                            primaryDatabaseServer = deploymentNode "Oracle - Primary" "" "Oracle 12c" "" "1" {
        
                                livePrimaryDatabaseInstance = containerInstance "database" "" ""
        
                            }
        
                        }
                        deploymentNode "bigbank-db02" "" "Ubuntu 16.04 LTS" "" "2" {
        
                            secondaryDatabaseServer = deploymentNode "Oracle - Secondary" "" "Oracle 12c" "Failover" "1" {
        
                                liveSecondaryDatabaseInstance = containerInstance "database" "Failover" ""
        
                            }
        
                        }
                        deploymentNode "bigbank-prod001" "" "" "" "1" {
        
                            softwareSystemInstance "mainframe" "" ""
        
                        }
        
                    }
                    "primaryDatabaseServer" -> secondaryDatabaseServer "Replicates data to" "" ""
        
                }
        
            }
            views {
        
                systemLandscape SystemLandscape  {
        
                    include "*"
                    autoLayout "tb" "300" "300"
        
                }
                systemContext internetBankingSystem SystemContext  {
        
                    include "*"
                    animation {
        
                        internetBankingSystem
                        customer
                        mainframe
                        email
        
                    }
                    autoLayout "tb" "300" "300"
                    description "The system context diagram for the Internet Banking System."
                    properties {
        
                        "structurizr.groups" "false"
        
                    }
        
                }
                container internetBankingSystem Containers  {
        
                    include "*"
                    animation {
        
                        customer
                        mainframe
                        email
                        webApplication
                        singlePageApplication
                        mobileApp
                        apiApplication
                        database
        
                    }
                    autoLayout "tb" "300" "300"
                    description "The container diagram for the Internet Banking System."
        
                }
                component apiApplication Components  {
        
                    include "*"
                    animation {
        
                        singlePageApplication
                        mobileApp
                        database
                        email
                        mainframe
                        signinController
                        securityComponent
                        accountsSummaryController
                        mainframeBankingSystemFacade
                        resetPasswordController
                        emailComponent
        
                    }
                    autoLayout "tb" "300" "300"
                    description "The component diagram for the API Application."
        
                }
                image mainframeBankingSystemFacade "MainframeBankingSystemFacade" {
        
                    image https://raw.githubusercontent.com/structurizr/examples/main/dsl/big-bank-plc/internet-banking-system/mainframe-banking-system-facade.png
                    title "[Code] Mainframe Banking System Facade"
        
                }
                dynamic apiApplication "SignIn" "Summarises how the sign in feature works in the single-page application." {
        
                    "singlePageApplication" -> signinController "Submits credentials to" ""
                    "signinController" -> securityComponent "Validates credentials using" ""
                    "securityComponent" -> database "select * from users where username = ?" ""
                    "database" -> securityComponent "Returns user data to" ""
                    "securityComponent" -> signinController "Returns true if the hashed password matches" ""
                    "signinController" -> singlePageApplication "Sends back an authentication token to" ""
                    autoLayout "tb" "300" "300"
                    description "Summarises how the sign in feature works in the single-page application."
        
                }
                deployment internetBankingSystem Development "DevelopmentDeployment" "" {
        
                    include "*"
                    animation {
        
                        developerSinglePageApplicationInstance
                        developerWebApplicationInstance
                        developerApiApplicationInstance
                        developerDatabaseInstance
        
                    }
                    autoLayout "tb" "300" "300"
                    description "An example development deployment scenario for the Internet Banking System."
        
                }
                deployment internetBankingSystem Live "LiveDeployment" "" {
        
                    include "*"
                    animation {
        
                        liveSinglePageApplicationInstance
                        liveMobileAppInstance
                        liveWebApplicationInstance
                        liveApiApplicationInstance
                        livePrimaryDatabaseInstance
                        liveSecondaryDatabaseInstance
        
                    }
                    autoLayout "tb" "300" "300"
                    description "An example live deployment scenario for the Internet Banking System."
        
                }
                styles {
        
                    element "Person" {
        
                        color #ffffff
                        fontSize 22
                        shape Person
        
                    }
                    element "Customer" {
        
                        background #08427b
        
                    }
                    element "Bank Staff" {
        
                        background #999999
        
                    }
                    element "Software System" {
        
                        background #1168bd
                        color #ffffff
        
                    }
                    element "Existing System" {
        
                        background #999999
                        color #ffffff
        
                    }
                    element "Container" {
        
                        background #438dd5
                        color #ffffff
        
                    }
                    element "Web Browser" {
        
                        shape WebBrowser
        
                    }
                    element "Mobile App" {
        
                        shape MobileDeviceLandscape
        
                    }
                    element "Database" {
        
                        shape Cylinder
        
                    }
                    element "Component" {
        
                        background #85bbf0
                        color #000000
        
                    }
                    element "Failover" {
        
                        opacity 25
        
                    }
        
                }
        
            }
        
        }`));
    });
});