import { Workspace, Model, SoftwareSystem, Container, DeploymentEnvironment, DeploymentNode, InfrastructureNode, ContainerInstance, Include, AutoLayout, Animation, Styles, Theme, Relationship, DeploymentView, ElementStyle, Tags } from '../src';
import { prettify } from '../src/shared/iserializeable';
import { Themes } from '../src/views/themes';

// Create the workspace
const awsWorkspace = new Workspace({
  name: 'Amazon Web Services Example',
  description: 'An example AWS deployment architecture.',
});

// Create the model entites
const modelEntities = new SoftwareSystem({
    id: 'springPetClinic',
    name: 'Spring PetClinic',
    description: 'Allows employees to view and manage information regarding the veterinarians, the clients, and their pets.',
    children: [
      new Container({
        id: 'webApplication',
        name: 'Web Application',
        description: 'Allows employees to view and manage information regarding the veterinarians, the clients, and their pets.',
        technology: 'Java and Spring Boot',
        tags: ['Application'],
      }),
      new Container({
        id: 'database',
        name: 'Database',
        description: 'Stores information regarding the veterinarians, the clients, and their pets.',
        technology: 'Relational database schema',
        tags: ['Database'],
      }),
    ],
});

const modelRelationship = new Relationship({ sourceId: 'webApplication', destinationId: 'database', description: "Reads from and writes to", technology: 'MySQL Protocol/SSL'})

// Create the deployment environment
const modelDeploymentEnviorment = new DeploymentEnvironment({
  name: 'Live',
  children: [
    new DeploymentNode({
      name: 'Amazon Web Services',
      children: [
        new Tags('Amazon Web Services - Cloud'),
        new DeploymentNode({
          id: 'region',
          name: 'US-East-1',
          children: [
            new Tags(['Amazon Web Services - Region']),
            new InfrastructureNode({
              id: 'route53',
              name: 'Route 53',
              description: 'Highly available and scalable cloud DNS service.',
              tags: ['Amazon Web Services - Route 53'],
            }),
            new InfrastructureNode({
              id: 'elb',
              name: 'Elastic Load Balancer',
              description: 'Automatically distributes incoming application traffic.',
              tags: ['Amazon Web Services - Elastic Load Balancing'],
            }),
            new DeploymentNode({
              name: 'autoscaling-group',
              tags: ['Amazon Web Services - Auto Scaling'],
              children: [
                new DeploymentNode({
                  name: 'ec2',
                  tags: ['Amazon Web Services - EC2'],
                  children: [
                    new ContainerInstance({
                      id: 'webApplicationInstance',
                      identifier: 'webApplication',
                    }),
                  ],
                }),
              ],
            }),
            new DeploymentNode({
              name: 'rds',
              tags: ['Amazon Web Services - RDS'],
              children: [
                new DeploymentNode({
                  name: 'mysql',
                  tags: ['Amazon Web Services - RDS MySQL instance'],
                  children: [
                    new ContainerInstance({
                      id: 'databaseInstance',
                      identifier: 'database',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Relationship({ sourceId: 'route53', destinationId: 'elb', description: 'Forwards requests to', technology: 'HTTPS'}),
    new Relationship({ sourceId: 'elb', destinationId: 'webApplicationInstance', description: 'Forwards requests to', technology: 'HTTPS'})
  ],
});


// Add model and deployment environment to the workspace
awsWorkspace.addModelChildrens([modelEntities, modelRelationship, modelDeploymentEnviorment]);

const modelDeploymentView = new DeploymentView({
    scope: 'springPetClinic',
    environment: 'Live',
    key: 'AmazonWebServicesDeployment',
    children: [
        new Include({
            identifierOrExpression: ['*'],
        }),
        new AutoLayout({
            rankDirection: 'lr'
        }),
        new Animation({
            identifier: ['route53', 'elb', 'webApplicationInstance', 'databaseInstance']
        })
    ]
})

// Add styles
const modelStyles = new Styles({
    children: [
        new ElementStyle({ tag: 'Element', children:  { shape: 'RoundedBox', background: '#ffffff' } }),
        new ElementStyle({ tag: 'Container', children: { background: '#ffffff' } }),
        new ElementStyle({ tag: 'Application', children: { background: '#ffffff' } }),
        new ElementStyle({ tag: 'Database', children: { shape: 'Cylinder' } }),
    ]
});

// Set theme
const theme = new Themes({
    urls: ['https://static.structurizr.com/themes/amazon-web-services-2020.04.30/theme.json']
});

awsWorkspace.addViewChildrens([modelDeploymentView, modelStyles, theme]);

// Serialize the workspace
const serializedWorkspace = awsWorkspace.serialize();

describe("Validate Aws Model Example", () => {
    it('should serialized correctly', () => {
        expect(prettify(serializedWorkspace)).toStrictEqual(prettify(`workspace "Amazon Web Services Example" "An example AWS deployment architecture."  {
    
            model {
                springPetClinic = softwaresystem "Spring PetClinic" "Allows employees to view and manage information regarding the veterinarians, the clients, and their pets." "" {
                    webApplication = container "Web Application" "Allows employees to view and manage information regarding the veterinarians, the clients, and their pets." "Java and Spring Boot" "Application"
                    
                    database = container "Database" "Stores information regarding the veterinarians, the clients, and their pets." "Relational database schema" "Database"
                    
                }
                
                "webApplication" -> database "Reads from and writes to" "MySQL Protocol/SSL" ""
                
                deploymentEnvironment "Live" {
                    deploymentNode "Amazon Web Services" "" "" "" "1" {
                        tags "Amazon Web Services - Cloud"
                        
                        region = deploymentNode "US-East-1" "" "" "" "1" {
                            tags "Amazon Web Services - Region"
                            
                            route53 = infrastructureNode "Route 53" "Highly available and scalable cloud DNS service." "" "Amazon Web Services - Route 53"
                            
                            elb = infrastructureNode "Elastic Load Balancer" "Automatically distributes incoming application traffic." "" "Amazon Web Services - Elastic Load Balancing"
                            
                            deploymentNode "autoscaling-group" "" "" "Amazon Web Services - Auto Scaling" "1" {
                                deploymentNode "ec2" "" "" "Amazon Web Services - EC2" "1" {
                                    webApplicationInstance = containerInstance "webApplication" "" ""
                                    
                                }
                                
                            }
                            
                            deploymentNode "rds" "" "" "Amazon Web Services - RDS" "1" {
                                deploymentNode "mysql" "" "" "Amazon Web Services - RDS MySQL instance" "1" {
                                    databaseInstance = containerInstance "database" "" ""
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                    "route53" -> elb "Forwards requests to" "HTTPS" ""
                    
                    "elb" -> webApplicationInstance "Forwards requests to" "HTTPS" ""
                    
                }
                
            }
            
            
            views {
                deployment springPetClinic Live "AmazonWebServicesDeployment" "" {
                    include "*"
                    
                    autoLayout "lr" "300" "300"
                    
                    animation {
                        route53
                        elb
                        webApplicationInstance
                        databaseInstance
                    }
                    
                }
                
                styles {
                    element "Element" {
                        shape RoundedBox
                        background #ffffff
                    }
                    
                    element "Container" {
                        background #ffffff
                    }
                    
                    element "Application" {
                        background #ffffff
                    }
                    
                    element "Database" {
                        shape Cylinder
                    }
                    
                }
                
                themes https://static.structurizr.com/themes/amazon-web-services-2020.04.30/theme.json
                
            }
            
        }
        
        `))
    })
})