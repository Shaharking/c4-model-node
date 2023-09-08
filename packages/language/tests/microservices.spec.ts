import { Workspace, Model, SoftwareSystem, Container, DeploymentEnvironment, DeploymentNode, InfrastructureNode, ContainerInstance, Include, AutoLayout, Animation, Styles, Theme, Relationship, DeploymentView, ElementStyle, Tags, Identifiers, Person, Group, ContainerView } from '../src';
import { prettify } from '../src/shared/iserializeable';
import { Themes } from '../src/views/themes';

const workspace = new Workspace();

// Workspace settings
workspace.addOthers([
    new Identifiers("hierarchical")
]);

// Add relationships
const modelRelationship = [
    new Relationship({ sourceId: 'user', destinationId: 'webapp'}),
    new Relationship({ sourceId: 'webapp', destinationId: 'service1Api'}),
    new Relationship({ sourceId: 'service1Api', destinationId: 'service2Api'}),
    new Relationship({ sourceId: 'service1Api', destinationId: 'service3Api'}),
    new Relationship({ sourceId: 'service2Api', destinationId: 'service4Api'}),
    new Relationship({ sourceId: 'service2Api', destinationId: 'service5Api'}),
    new Relationship({ sourceId: 'webapp', destinationId: 'service3Api'}),
    new Relationship({ sourceId: 'service3Api', destinationId: 'service4Api'}),
    new Relationship({ sourceId: 'service3Api', destinationId: 'service7Api'}),
    new Relationship({ sourceId: 'service4Api', destinationId: 'service6Api'}),
    new Relationship({ sourceId: 'service7Api', destinationId: 'service8Api'}),
]

const modelEntities = [
    new Person({ id: 'user', name: "User" }),
    new SoftwareSystem({ 
        id: 'softwareSystem',
        name: "Software System",
        children: [
            new Container({
                id: 'webapp',
                name: "Web Application"
            }),
            ...new Array(8).fill(null).map((_value, index) => {
                const i = index + 1;
                return new Group({
                    id: `service${i}`,
                    name: `Service ${i}`,
                    children: [
                        new Container({
                            id: `service${i}Api`,
                            name: `Service ${i} API`,
                            children: [
                                new Tags([`Service ${i}`, "Service API"])
                            ]
                        }),
                        new Container({
                            name: `Service ${i} Database`,
                            children: [
                                new Tags([`Service ${i}`, "Database"]),
                                new Relationship({ sourceId: `service${i}Api`, destinationId: 'this', description: "Reads from and writes to"})
                            ]
                        })
                    ]
                })
            }),
            ...modelRelationship
        ]
    })
]



workspace.addModelChildrens(modelEntities);

const viewsContainers = [
    new ContainerView({
        softwareSystem: "softwareSystem",
        key: "Containers_All",
        children: [
            new Include({ identifierOrExpression: ['*'] }),
            new AutoLayout()
        ]
    }),
    ...new Array(3).fill(null).map((_, index) => {
        const i = index + 1;
        return new ContainerView({
            softwareSystem: "softwareSystem",
            key: `Containers_Service${i}`,
            children: [
                new Include({ identifierOrExpression: [`->softwareSystem.service${i}->`] }),
                new AutoLayout()
            ]
        })
    })
]


const serviceBackgrounds = {
    "Service 1": "#91F0AE",
    "Service 2": "#EDF08C",
    "Service 3": "#8CD0F0",
    "Service 4": "#F08CA4",
    "Service 5": "#FFAC33",
    "Service 6": "#DD8BFE",
    "Service 7": "#89ACFF",
    "Service 8": "#FDA9F4",
} as const;

const styles = new Styles({
    children: [
        new ElementStyle({
            tag: "Person",
            children: {
                shape: 'Person'
            }
        }),
        new ElementStyle({
            tag: "Service API",
            children: {
                shape: 'Hexagon'
            }
        }),
        new ElementStyle({
            tag: "Database",
            children: {
                shape: 'Cylinder'
            }
        }),
        ...Object.entries(serviceBackgrounds).map((service) => {
            const [name, backgroundColor] = service;
            return new ElementStyle({
                tag: name,
                children: {
                    background: backgroundColor
                }
            })
        })
    ]
})

workspace.addViewChildrens(viewsContainers);
workspace.addViewChildrens([styles]);

const serializedWorkspace = workspace.serialize();

describe('Validate Microservice Example', () => {
    it('should serialized correctly', () => {
        expect(prettify(serializedWorkspace)).toEqual(prettify(`workspace "" ""  {

            !identifiers hierarchical
            model {
        
                user = person "User" "" ""
                softwareSystem = softwaresystem "Software System" "" "" {
        
                    webapp = container "Web Application" "" "" ""
                    service1 = group "Service 1" {
        
                        service1Api = container "Service 1 API" "" "" "" {
        
                            tags "Service 1,Service API"
        
                        }
                        container "Service 1 Database" "" "" "" {
        
                            tags "Service 1,Database"
                            "service1Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service2 = group "Service 2" {
        
                        service2Api = container "Service 2 API" "" "" "" {
        
                            tags "Service 2,Service API"
        
                        }
                        container "Service 2 Database" "" "" "" {
        
                            tags "Service 2,Database"
                            "service2Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service3 = group "Service 3" {
        
                        service3Api = container "Service 3 API" "" "" "" {
        
                            tags "Service 3,Service API"
        
                        }
                        container "Service 3 Database" "" "" "" {
        
                            tags "Service 3,Database"
                            "service3Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service4 = group "Service 4" {
        
                        service4Api = container "Service 4 API" "" "" "" {
        
                            tags "Service 4,Service API"
        
                        }
                        container "Service 4 Database" "" "" "" {
        
                            tags "Service 4,Database"
                            "service4Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service5 = group "Service 5" {
        
                        service5Api = container "Service 5 API" "" "" "" {
        
                            tags "Service 5,Service API"
        
                        }
                        container "Service 5 Database" "" "" "" {
        
                            tags "Service 5,Database"
                            "service5Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service6 = group "Service 6" {
        
                        service6Api = container "Service 6 API" "" "" "" {
        
                            tags "Service 6,Service API"
        
                        }
                        container "Service 6 Database" "" "" "" {
        
                            tags "Service 6,Database"
                            "service6Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service7 = group "Service 7" {
        
                        service7Api = container "Service 7 API" "" "" "" {
        
                            tags "Service 7,Service API"
        
                        }
                        container "Service 7 Database" "" "" "" {
        
                            tags "Service 7,Database"
                            "service7Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    service8 = group "Service 8" {
        
                        service8Api = container "Service 8 API" "" "" "" {
        
                            tags "Service 8,Service API"
        
                        }
                        container "Service 8 Database" "" "" "" {
        
                            tags "Service 8,Database"
                            "service8Api" -> this "Reads from and writes to" "" ""
        
                        }
        
                    }
                    "user" -> webapp "" "" ""
                    "webapp" -> service1Api "" "" ""
                    "service1Api" -> service2Api "" "" ""
                    "service1Api" -> service3Api "" "" ""
                    "service2Api" -> service4Api "" "" ""
                    "service2Api" -> service5Api "" "" ""
                    "webapp" -> service3Api "" "" ""
                    "service3Api" -> service4Api "" "" ""
                    "service3Api" -> service7Api "" "" ""
                    "service4Api" -> service6Api "" "" ""
                    "service7Api" -> service8Api "" "" ""
        
                }
        
            }
            views {
        
                container softwareSystem Containers_All  {
        
                    include "*"
                    autoLayout "tb" "300" "300"
        
                }
                container softwareSystem Containers_Service1  {
        
                    include "->softwareSystem.service1->"
                    autoLayout "tb" "300" "300"
        
                }
                container softwareSystem Containers_Service2  {
        
                    include "->softwareSystem.service2->"
                    autoLayout "tb" "300" "300"
        
                }
                container softwareSystem Containers_Service3  {
        
                    include "->softwareSystem.service3->"
                    autoLayout "tb" "300" "300"
        
                }
                styles {
        
                    element "Person" {
        
                        shape Person
        
                    }
                    element "Service API" {
        
                        shape Hexagon
        
                    }
                    element "Database" {
        
                        shape Cylinder
        
                    }
                    element "Service 1" {
        
                        background #91F0AE
        
                    }
                    element "Service 2" {
        
                        background #EDF08C
        
                    }
                    element "Service 3" {
        
                        background #8CD0F0
        
                    }
                    element "Service 4" {
        
                        background #F08CA4
        
                    }
                    element "Service 5" {
        
                        background #FFAC33
        
                    }
                    element "Service 6" {
        
                        background #DD8BFE
        
                    }
                    element "Service 7" {
        
                        background #89ACFF
        
                    }
                    element "Service 8" {
        
                        background #FDA9F4
        
                    }
        
                }
        
            }
        
        }
        `))
    })
})