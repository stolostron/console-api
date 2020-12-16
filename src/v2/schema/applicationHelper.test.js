/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 * * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import getApplicationElements, {
  createReplicaChild,
  createIngressRouteChild,
  createGenericPackageObject,
  addSubscriptionCharts,
  addSubscriptionDeployable,
  addClusters,
  processServiceOwner,
  processServices,
  processDeployables,
  getSubscriptionPackageInfo,
  removeReleaseGeneratedSuffix,
  removeHelmReleaseName,
  isPrePostHookDeployable,
  createDeployableObject,
  getLocalClusterElement,
} from './applicationHelper';

const getApplicationElementsObj = {
  "name":"val-multi-subs-app",
  "namespace":"val-multi-subs-app-ns",
  "app":{
     "apiVersion":"app.k8s.io/v1beta1",
     "kind":"Application",
     "metadata":{
        "annotations":{
           "apps.open-cluster-management.io/deployables":"",
           "apps.open-cluster-management.io/subscriptions":"val-multi-subs-app-ns/val-multi-subs-app-subscription-1,val-multi-subs-app-ns/val-multi-subs-app-subscription-2",
           "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LHN5c3RlbTphdXRoZW50aWNhdGVk",
           "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50Om11bHRpY2x1c3Rlci1vcGVyYXRvcnM="
        },
        "creationTimestamp":"2020-12-14T17:46:54Z",
        "generation":1,
        "name":"val-multi-subs-app",
        "namespace":"val-multi-subs-app-ns",
        "resourceVersion":"124723690",
        "selfLink":"/apis/app.k8s.io/v1beta1/namespaces/val-multi-subs-app-ns/applications/val-multi-subs-app",
        "uid":"79a633cd-f224-4ac5-b873-13d1fe714d2a"
     },
     "spec":{
        "componentKinds":[
           {
              "group":"apps.open-cluster-management.io",
              "kind":"Subscription"
           }
        ],
        "descriptor":{
           
        },
        "selector":{
           "matchExpressions":[
              {
                 "key":"app",
                 "operator":"In",
                 "values":[
                    "val-multi-subs-app"
                 ]
              }
           ]
        }
     }
  },
  "metadata":{
     "annotations":{
        "apps.open-cluster-management.io/deployables":"",
        "apps.open-cluster-management.io/subscriptions":"val-multi-subs-app-ns/val-multi-subs-app-subscription-1,val-multi-subs-app-ns/val-multi-subs-app-subscription-2",
        "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LHN5c3RlbTphdXRoZW50aWNhdGVk",
        "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50Om11bHRpY2x1c3Rlci1vcGVyYXRvcnM="
     },
     "creationTimestamp":"2020-12-14T17:46:54Z",
     "generation":1,
     "name":"val-multi-subs-app",
     "namespace":"val-multi-subs-app-ns",
     "resourceVersion":"124723690",
     "selfLink":"/apis/app.k8s.io/v1beta1/namespaces/val-multi-subs-app-ns/applications/val-multi-subs-app",
     "uid":"79a633cd-f224-4ac5-b873-13d1fe714d2a"
  },
  "activeChannel":"val-multi-subs-app-ns/val-multi-subs-app-subscription-1//mortgagers-ch/mortgagers-channel",
  "channels":[
     "__ALL__/__ALL__//__ALL__/__ALL__",
     "val-multi-subs-app-ns/val-multi-subs-app-subscription-1//mortgagers-ch/mortgagers-channel",
     "val-multi-subs-app-ns/val-multi-subs-app-subscription-2//val-demo-saude-ns/github-redhat-sa-brazil-demo-summitgov-cy20///etherpad-demo-etherpad-config-configmap///saude-digital-saude-digital-dashboard-deployment",
     "val-multi-subs-app-ns/val-multi-subs-app-subscription-2//val-demo-saude-ns/github-redhat-sa-brazil-demo-summitgov-cy20///application-demo-saude-digital-saude-digital-dashboard-service///multicluster-appmgmt-demo-saude-digital-placementrule",
     "val-multi-subs-app-ns/val-multi-subs-app-subscription-2//val-demo-saude-ns/github-redhat-sa-brazil-demo-summitgov-cy20///appmgmt-demo-saude-digital-repos-namespace///policy-k8s-certificatepolicy-policy",
     "val-multi-subs-app-ns/val-multi-subs-app-subscription-2//val-demo-saude-ns/github-redhat-sa-brazil-demo-summitgov-cy20///openshift-operators-namespace-policy///placement-openshift-operators-namespace-placementrule"
  ],
  "subscriptions":[
     {
        "apiVersion":"apps.open-cluster-management.io/v1",
        "kind":"Subscription",
        "metadata":{
           "annotations":{
              "apps.open-cluster-management.io/deployables":"val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-svc-service,val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-deploy-deployment,val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-route-route",
              "apps.open-cluster-management.io/git-branch":"master",
              "apps.open-cluster-management.io/git-commit":"ab34fc480c6d3558933df2a0c510a280bdc6c3fc",
              "apps.open-cluster-management.io/git-path":"helloworld",
              "apps.open-cluster-management.io/topo":"deployable//Service//helloworld-app-svc/0,deployable//Deployment//helloworld-app-deploy/1,deployable//Route//helloworld-app-route/0"
           },
           "creationTimestamp":"2020-12-14T17:46:54Z",
           "generation":2,
           "labels":{
              "app":"val-multi-subs-app"
           },
           "name":"val-multi-subs-app-subscription-1",
           "namespace":"val-multi-subs-app-ns",
           "resourceVersion":"124731134",
           "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/subscriptions/val-multi-subs-app-subscription-1",
           "uid":"72df903c-bb1d-4b56-a13f-03a5b7d4ef1e"
        },
        "spec":{
           "channel":"mortgagers-ch/mortgagers-channel",
           "placement":{
              "placementRef":{
                 "kind":"PlacementRule",
                 "name":"val-multi-subs-app-placement-1"
              }
           },
           "timewindow":{
              "daysofweek":[
                 "Monday",
                 "Tuesday"
              ],
              "hours":[
                 {
                    "end":"02:58PM",
                    "start":"02:58AM"
                 }
              ],
              "location":"America/Toronto",
              "windowtype":"active"
           }
        },
        "status":{
           "lastUpdateTime":"2020-12-15T20:03:30Z",
           "message":"vbirsan1-remote:Blocked",
           "phase":"Propagated",
           "statuses":{
              "vbirsan1-remote":{
                 "packages":{
                    "/":{
                       "lastUpdateTime":"2020-12-15T20:03:13Z",
                       "message":"Blocked",
                       "phase":"Subscribed"
                    }
                 }
              }
           }
        },
        "deployables":[
           {
              "apiVersion":"apps.open-cluster-management.io/v1",
              "kind":"Deployable",
              "metadata":{
                 "annotations":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/deployable-version":"apps/v1",
                    "apps.open-cluster-management.io/external-source":"helloworld",
                    "apps.open-cluster-management.io/is-local-deployable":"false",
                    "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LHN5c3RlbTphdXRoZW50aWNhdGVk",
                    "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50Om11bHRpY2x1c3Rlci1vcGVyYXRvcnM="
                 },
                 "creationTimestamp":"2020-12-15T19:58:58Z",
                 "generation":1,
                 "labels":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/channel-type":"GitHub",
                    "apps.open-cluster-management.io/subscription":"val-multi-subs-app-ns-val-multi-subs-app-subscription-1"
                 },
                 "name":"val-multi-subs-app-subscription-1-helloworld-helloworld-app-deploy-deployment",
                 "namespace":"val-multi-subs-app-ns",
                 "ownerReferences":[
                    {
                       "apiVersion":"apps.open-cluster-management.io/v1",
                       "blockOwnerDeletion":true,
                       "controller":true,
                       "kind":"Subscription",
                       "name":"val-multi-subs-app-subscription-1",
                       "uid":"72df903c-bb1d-4b56-a13f-03a5b7d4ef1e"
                    }
                 ],
                 "resourceVersion":"124723682",
                 "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/deployables/val-multi-subs-app-subscription-1-helloworld-helloworld-app-deploy-deployment",
                 "uid":"4a80959a-d921-403c-b7ae-10f942c60585"
              },
              "spec":{
                 "template":{
                    "apiVersion":"apps/v1",
                    "kind":"Deployment",
                    "metadata":{
                       "labels":{
                          "app":"helloworld-app"
                       },
                       "name":"helloworld-app-deploy"
                    },
                    "spec":{
                       "replicas":1,
                       "selector":{
                          "matchLabels":{
                             "app":"helloworld-app"
                          }
                       },
                       "template":{
                          "metadata":{
                             "labels":{
                                "app":"helloworld-app"
                             }
                          },
                          "spec":{
                             "containers":[
                                {
                                   "env":[
                                      {
                                         "name":"PORT",
                                         "value":"3002"
                                      }
                                   ],
                                   "image":"fxiang/helloworld:0.0.1",
                                   "imagePullPolicy":"IfNotPresent",
                                   "name":"helloworld-app-container",
                                   "ports":[
                                      {
                                         "containerPort":3002
                                      }
                                   ],
                                   "resources":{
                                      "limits":{
                                         "cpu":"200m",
                                         "memory":"256Mi"
                                      },
                                      "request":{
                                         "cpu":"50m",
                                         "memory":"64Mi"
                                      }
                                   }
                                }
                             ]
                          }
                       }
                    }
                 }
              }
           },
           {
              "apiVersion":"apps.open-cluster-management.io/v1",
              "kind":"Deployable",
              "metadata":{
                 "annotations":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/deployable-version":"route.openshift.io/v1",
                    "apps.open-cluster-management.io/external-source":"helloworld",
                    "apps.open-cluster-management.io/is-local-deployable":"false",
                    "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LHN5c3RlbTphdXRoZW50aWNhdGVk",
                    "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50Om11bHRpY2x1c3Rlci1vcGVyYXRvcnM="
                 },
                 "creationTimestamp":"2020-12-15T19:58:58Z",
                 "generation":1,
                 "labels":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/channel-type":"GitHub",
                    "apps.open-cluster-management.io/subscription":"val-multi-subs-app-ns-val-multi-subs-app-subscription-1"
                 },
                 "name":"val-multi-subs-app-subscription-1-helloworld-helloworld-app-route-route",
                 "namespace":"val-multi-subs-app-ns",
                 "ownerReferences":[
                    {
                       "apiVersion":"apps.open-cluster-management.io/v1",
                       "blockOwnerDeletion":true,
                       "controller":true,
                       "kind":"Subscription",
                       "name":"val-multi-subs-app-subscription-1",
                       "uid":"72df903c-bb1d-4b56-a13f-03a5b7d4ef1e"
                    }
                 ],
                 "resourceVersion":"124723683",
                 "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/deployables/val-multi-subs-app-subscription-1-helloworld-helloworld-app-route-route",
                 "uid":"41282db9-d366-452e-8d65-80114fb45878"
              },
              "spec":{
                 "template":{
                    "apiVersion":"route.openshift.io/v1",
                    "kind":"Route",
                    "metadata":{
                       "labels":{
                          "app":"helloworld-app"
                       },
                       "name":"helloworld-app-route"
                    },
                    "spec":{
                       "port":{
                          "targetPort":3002
                       },
                       "to":{
                          "kind":"Service",
                          "name":"helloworld-app-svc",
                          "weight":100
                       },
                       "wildcardPolicy":"None"
                    }
                 }
              }
           },
           {
              "apiVersion":"apps.open-cluster-management.io/v1",
              "kind":"Deployable",
              "metadata":{
                 "annotations":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/deployable-version":"v1",
                    "apps.open-cluster-management.io/external-source":"helloworld",
                    "apps.open-cluster-management.io/is-local-deployable":"false",
                    "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LHN5c3RlbTphdXRoZW50aWNhdGVk",
                    "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50Om11bHRpY2x1c3Rlci1vcGVyYXRvcnM="
                 },
                 "creationTimestamp":"2020-12-15T19:58:58Z",
                 "generation":1,
                 "labels":{
                    "apps.open-cluster-management.io/channel":"mortgagers-channel",
                    "apps.open-cluster-management.io/channel-type":"GitHub",
                    "apps.open-cluster-management.io/subscription":"val-multi-subs-app-ns-val-multi-subs-app-subscription-1"
                 },
                 "name":"val-multi-subs-app-subscription-1-helloworld-helloworld-app-svc-service",
                 "namespace":"val-multi-subs-app-ns",
                 "ownerReferences":[
                    {
                       "apiVersion":"apps.open-cluster-management.io/v1",
                       "blockOwnerDeletion":true,
                       "controller":true,
                       "kind":"Subscription",
                       "name":"val-multi-subs-app-subscription-1",
                       "uid":"72df903c-bb1d-4b56-a13f-03a5b7d4ef1e"
                    }
                 ],
                 "resourceVersion":"124723684",
                 "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/deployables/val-multi-subs-app-subscription-1-helloworld-helloworld-app-svc-service",
                 "uid":"1203e3e8-677b-4b5d-9dd7-38842fccc654"
              },
              "spec":{
                 "template":{
                    "apiVersion":"v1",
                    "kind":"Service",
                    "metadata":{
                       "labels":{
                          "app":"helloworld-app"
                       },
                       "name":"helloworld-app-svc"
                    },
                    "spec":{
                       "ports":[
                          {
                             "port":3002,
                             "protocol":"TCP",
                             "targetPort":3002
                          }
                       ],
                       "selector":{
                          "app":"helloworld-app"
                       },
                       "type":"NodePort"
                    }
                 }
              }
           }
        ],
        "channels":[
           
        ],
        "rules":[
           {
              "apiVersion":"apps.open-cluster-management.io/v1",
              "kind":"PlacementRule",
              "metadata":{
                 "creationTimestamp":"2020-12-14T17:46:53Z",
                 "generation":1,
                 "labels":{
                    "app":"val-multi-subs-app"
                 },
                 "name":"val-multi-subs-app-placement-1",
                 "namespace":"val-multi-subs-app-ns",
                 "resourceVersion":"122207437",
                 "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/placementrules/val-multi-subs-app-placement-1",
                 "uid":"8bbe040e-19d6-4fa9-8ec4-6083eb65e82c"
              },
              "spec":{
                 "clusterSelector":{
                    "matchLabels":{
                       "name":"vbirsan1-remote"
                    }
                 }
              },
              "status":{
                 "decisions":[
                    {
                       "clusterName":"vbirsan1-remote",
                       "clusterNamespace":"vbirsan1-remote"
                    }
                 ]
              }
           }
        ]
     }
  ],
  "allSubscriptions":[
     {
        "apiVersion":"apps.open-cluster-management.io/v1",
        "kind":"Subscription",
        "metadata":{
           "annotations":{
              "apps.open-cluster-management.io/deployables":"val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-svc-service,val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-deploy-deployment,val-multi-subs-app-ns/val-multi-subs-app-subscription-1-helloworld-helloworld-app-route-route",
              "apps.open-cluster-management.io/git-branch":"master",
              "apps.open-cluster-management.io/git-commit":"ab34fc480c6d3558933df2a0c510a280bdc6c3fc",
              "apps.open-cluster-management.io/git-path":"helloworld",
              "apps.open-cluster-management.io/topo":"deployable//Service//helloworld-app-svc/0,deployable//Deployment//helloworld-app-deploy/1,deployable//Route//helloworld-app-route/0"
           },
           "creationTimestamp":"2020-12-14T17:46:54Z",
           "generation":2,
           "labels":{
              "app":"val-multi-subs-app"
           },
           "name":"val-multi-subs-app-subscription-1",
           "namespace":"val-multi-subs-app-ns",
           "resourceVersion":"124731134",
           "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/subscriptions/val-multi-subs-app-subscription-1",
           "uid":"72df903c-bb1d-4b56-a13f-03a5b7d4ef1e"
        },
        "spec":{
           "channel":"mortgagers-ch/mortgagers-channel",
           "placement":{
              "placementRef":{
                 "kind":"PlacementRule",
                 "name":"val-multi-subs-app-placement-1"
              }
           },
           "timewindow":{
              "daysofweek":[
                 "Monday",
                 "Tuesday"
              ],
              "hours":[
                 {
                    "end":"02:58PM",
                    "start":"02:58AM"
                 }
              ],
              "location":"America/Toronto",
              "windowtype":"active"
           }
        },
        "status":{
           "lastUpdateTime":"2020-12-15T20:03:30Z",
           "message":"vbirsan1-remote:Blocked",
           "phase":"Propagated",
           "statuses":{
              "vbirsan1-remote":{
                 "packages":{
                    "/":{
                       "lastUpdateTime":"2020-12-15T20:03:13Z",
                       "message":"Blocked",
                       "phase":"Subscribed"
                    }
                 }
              }
           }
        }
     },
     {
        "apiVersion":"apps.open-cluster-management.io/v1",
        "kind":"Subscription",
        "metadata":{
           "annotations":{
              "apps.open-cluster-management.io/deployables":"val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-etherpad-repos-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-demo-policies-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-mers-handler-integration,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-github-redhat-sa-brazil-demo-summitgov-cy20-channel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-streams-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-etherpad-demo-etherpad-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-myui-service,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-k8s-certificatepolicy-policy,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-etherpad-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-etherpad-demo-etherpad-service,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-unknown-handler-integration,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-alpha-handler-inmemorychannel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-placement-openshift-operators-namespace-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-repos-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-subscription,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-humancontact-inmemorychannel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-streams-repos-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-placement-default-networkpolicy-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-etherpad-demo-etherpad-config-configmap,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-placement-k8s-certificatepolicy-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-streams-subscription,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-muyi-deployment,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-binding-k8s-certificatepolicy-placementbinding,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-virus-dispatcher-integration,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-noval-handler-inmemorychannel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-example-integrationplatform,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-binding-global-iampolicy-placementbinding,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-binding-openshift-operators-namespace-placementbinding,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-etherpad-application,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-myui-route,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-streams-application,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-saude-digital-dashboard-service,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-streams-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-etherpad-demo-etherpad-deployment,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-etherpad-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-openshift-operators-namespace-policy,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-simulate-sender-integration,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-unknown-handler-inmemorychannel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-demo-saude-digital-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-streams-my-cluster-kafka,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-default-networkpolicy-policy,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-alpha-handler-integration,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-streams-my-topic-kafkatopic,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-binding-default-networkpolicy-placementbinding,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-mers-handler-inmemorychannel,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-placement-global-iampolicy-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-application,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-policy-global-iampolicy-policy,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-saude-digital-dashboard-deployment,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-saude-digital-placementrule,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-application-demo-saude-digital-streams-demo-saude-digital-streams-namespace,val-multi-subs-app-ns/val-multi-subs-app-subscription-2-resources-multicluster-appmgmt-demo-etherpad-subscription",
              "apps.open-cluster-management.io/git-branch":"master",
              "apps.open-cluster-management.io/git-commit":"3abdc7e3e11b4305fce0f2d21631b6637c12c2d8",
              "apps.open-cluster-management.io/git-path":"resources",
              "apps.open-cluster-management.io/topo":"deployable//InMemoryChannel/demo-saude-digital/noval-handler/0,deployable//IntegrationPlatform/demo-saude-digital/example/0,deployable//PlacementBinding/open-cluster-management-policies/binding-global-iampolicy/0,deployable//Integration/demo-saude-digital/virus-dispatcher/0,deployable//Application/demo-etherpad/demo-etherpad/0,deployable//PlacementBinding/open-cluster-management-policies/binding-openshift-operators-namespace/0,deployable//Route/demo-saude-digital/myui/0,deployable//Application/demo-saude-digital-streams/demo-saude-digital-streams/0,deployable//Service/demo-saude-digital/saude-digital-dashboard/0,deployable//Namespace//demo-etherpad/0,deployable//PlacementRule/demo-saude-digital-streams/demo-saude-digital-streams/0,deployable//Deployment/demo-etherpad/demo-etherpad/1,deployable//InMemoryChannel/demo-saude-digital/unknown-handler/0,deployable//Namespace//demo-saude-digital/0,deployable//Kafka/demo-saude-digital-streams/my-cluster/0,deployable//Policy/open-cluster-management-policies/openshift-operators-namespace/0,deployable//Integration/demo-saude-digital/simulate-sender/0,deployable//Policy/demo-policies/default-networkpolicy/0,deployable//Integration/demo-saude-digital/alpha-handler/0,deployable//KafkaTopic/demo-saude-digital-streams/my-topic/0,deployable//PlacementBinding/demo-policies/binding-default-networkpolicy/0,deployable//Application/demo-saude-digital/demo-saude-digital/0,deployable//InMemoryChannel/demo-saude-digital/mers-handler/0,deployable//PlacementRule/open-cluster-management-policies/placement-global-iampolicy/0,deployable//Policy/open-cluster-management-policies/global-iampolicy/0,deployable//Deployment/demo-saude-digital/saude-digital-dashboard/1,deployable//PlacementRule/demo-saude-digital/demo-saude-digital/0,deployable//Namespace//demo-saude-digital-streams/0,deployable//Subscription/demo-etherpad/demo-etherpad/0,deployable//Namespace//demo-etherpad-repos/0,deployable//Integration/demo-saude-digital/mers-handler/0,deployable//Channel/demo-etherpad-repos/github-redhat-sa-brazil-demo-summitgov-cy20/0,deployable//Namespace//demo-saude-digital-streams/0,deployable//Namespace//demo-policies/0,deployable//Namespace//demo-saude-digital/0,deployable//Policy/open-cluster-management-policies/k8s-certificatepolicy/0,deployable//Namespace//demo-etherpad/0,deployable//Service/demo-saude-digital/myui/0,deployable//InMemoryChannel/demo-saude-digital/alpha-handler/0,deployable//PlacementRule/open-cluster-management-policies/placement-openshift-operators-namespace/0,deployable//Namespace//demo-saude-digital-repos/0,deployable//PlacementRule/demo-etherpad/demo-etherpad/0,deployable//Service/demo-etherpad/demo-etherpad/0,deployable//Integration/demo-saude-digital/unknown-handler/0,deployable//Namespace//demo-saude-digital-streams-repos/0,deployable//PlacementRule/demo-policies/placement-default-networkpolicy/0,deployable//ConfigMap/demo-etherpad/demo-etherpad-config/0,deployable//Subscription/demo-saude-digital/demo-saude-digital/0,deployable//InMemoryChannel/demo-saude-digital/humancontact/0,deployable//PlacementRule/open-cluster-management-policies/placement-k8s-certificatepolicy/0,deployable//Subscription/demo-saude-digital-streams/demo-saude-digital-streams/0,deployable//Deployment/demo-saude-digital/muyi/1,deployable//PlacementBinding/open-cluster-management-policies/binding-k8s-certificatepolicy/0"
           },
           "creationTimestamp":"2020-12-14T18:58:16Z",
           "generation":1,
           "labels":{
              "app":"val-multi-subs-app"
           },
           "name":"val-multi-subs-app-subscription-2",
           "namespace":"val-multi-subs-app-ns",
           "resourceVersion":"124723606",
           "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-multi-subs-app-ns/subscriptions/val-multi-subs-app-subscription-2",
           "uid":"221b82a4-4c6f-4ec1-85df-4afafe8c828e"
        },
        "spec":{
           "channel":"val-demo-saude-ns/github-redhat-sa-brazil-demo-summitgov-cy20",
           "placement":{
              "placementRef":{
                 "kind":"PlacementRule",
                 "name":"val-multi-subs-app-placement-2"
              }
           }
        },
        "status":{
           "lastUpdateTime":"2020-12-14T19:11:00Z",
           "message":"vbirsan1-remote:Active",
           "phase":"Propagated",
           "statuses":{
              "vbirsan1-remote":{
                 "packages":{
                    "github-redhat-sa-brazil-demo-summitgov-cy20-ConfigMap-demo-etherpad-config":{
                       "lastUpdateTime":"2020-12-14T19:10:53Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-etherpad-config exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Deployment-demo-etherpad":{
                       "lastUpdateTime":"2020-12-14T19:10:54Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-etherpad exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Deployment-muyi":{
                       "lastUpdateTime":"2020-12-14T19:10:54Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/muyi exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Deployment-saude-digital-dashboard":{
                       "lastUpdateTime":"2020-12-14T19:10:54Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/saude-digital-dashboard exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-etherpad":{
                       "lastUpdateTime":"2020-12-14T19:10:48Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-etherpad exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-etherpad-repos":{
                       "lastUpdateTime":"2020-12-14T19:10:51Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-etherpad-repos exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-policies":{
                       "lastUpdateTime":"2020-12-14T19:10:52Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-policies exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-saude-digital":{
                       "lastUpdateTime":"2020-12-14T19:10:49Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-saude-digital exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-saude-digital-repos":{
                       "lastUpdateTime":"2020-12-14T19:10:50Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-saude-digital-repos exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-saude-digital-streams":{
                       "lastUpdateTime":"2020-12-14T19:10:52Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-saude-digital-streams exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Namespace-demo-saude-digital-streams-repos":{
                       "lastUpdateTime":"2020-12-14T19:10:52Z",
                       "phase":"Failed",
                       "reason":"Obj /demo-saude-digital-streams-repos exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Route-myui":{
                       "lastUpdateTime":"2020-12-14T19:10:57Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/myui exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Service-demo-etherpad":{
                       "lastUpdateTime":"2020-12-14T19:10:58Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-etherpad exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Service-myui":{
                       "lastUpdateTime":"2020-12-14T19:10:59Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/myui exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Service-saude-digital-dashboard":{
                       "lastUpdateTime":"2020-12-14T19:10:58Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/saude-digital-dashboard exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Subscription-demo-etherpad":{
                       "lastUpdateTime":"2020-12-14T19:10:56Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-etherpad exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Subscription-demo-saude-digital":{
                       "lastUpdateTime":"2020-12-14T19:10:56Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-saude-digital exists and owned by others, backoff"
                    },
                    "github-redhat-sa-brazil-demo-summitgov-cy20-Subscription-demo-saude-digital-streams":{
                       "lastUpdateTime":"2020-12-14T19:10:56Z",
                       "phase":"Failed",
                       "reason":"Obj val-multi-subs-app-ns/demo-saude-digital-streams exists and owned by others, backoff"
                    }
                 }
              }
           }
        }
     }
  ],
  "allChannels":[
     {
        "apiVersion":"apps.open-cluster-management.io/v1",
        "kind":"Channel",
        "metadata":{
           "annotations":{
              "apps.open-cluster-management.io/hosting-deployable":"ggithubcom-redhat-sa-brazil-demo-summitgov-cy20-ns/ggithubcom-redhat-sa-brazil-demo-summitgov-cy20-Channel-github-redhat-sa-brazil-demo-summitgov-cy20",
              "apps.open-cluster-management.io/hosting-subscription":"val-demo-saude-ns/val-demo-saude-subscription-1-local",
              "apps.open-cluster-management.io/sync-source":"subgbk8s-val-demo-saude-ns/val-demo-saude-subscription-1-local",
              "open-cluster-management.io/user-group":"c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOm9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LWFnZW50LWFkZG9uLHN5c3RlbTphdXRoZW50aWNhdGVk",
              "open-cluster-management.io/user-identity":"c3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW4tY2x1c3Rlci1tYW5hZ2VtZW50LWFnZW50LWFkZG9uOmtsdXN0ZXJsZXQtYWRkb24tYXBwbWdy"
           },
           "creationTimestamp":"2020-12-08T21:20:54Z",
           "generation":1,
           "name":"github-redhat-sa-brazil-demo-summitgov-cy20",
           "namespace":"val-demo-saude-ns",
           "resourceVersion":"111173198",
           "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/val-demo-saude-ns/channels/github-redhat-sa-brazil-demo-summitgov-cy20",
           "uid":"924c49f6-d121-49e9-af79-4a60bb9d7090"
        },
        "spec":{
           "pathname":"https://github.com/redhat-sa-brazil/demo-summitgov-cy20.git",
           "type":"GitHub"
        }
     },
     {
        "apiVersion":"apps.open-cluster-management.io/v1",
        "kind":"Channel",
        "metadata":{
           "annotations":{
              "kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"apps.open-cluster-management.io/v1\",\"kind\":\"Channel\",\"metadata\":{\"annotations\":{},\"name\":\"mortgagers-channel\",\"namespace\":\"mortgagers-ch\"},\"spec\":{\"pathname\":\"https://github.com/fxiang1/app-samples.git\",\"type\":\"GitHub\"}}\n",
              "open-cluster-management.io/user-group":"c3lzdGVtOmNsdXN0ZXItYWRtaW5zLHN5c3RlbTphdXRoZW50aWNhdGVk",
              "open-cluster-management.io/user-identity":"a3ViZTphZG1pbg=="
           },
           "creationTimestamp":"2020-12-08T21:19:21Z",
           "generation":1,
           "name":"mortgagers-channel",
           "namespace":"mortgagers-ch",
           "resourceVersion":"111169251",
           "selfLink":"/apis/apps.open-cluster-management.io/v1/namespaces/mortgagers-ch/channels/mortgagers-channel",
           "uid":"bdfd2ba6-af8d-4014-9cbf-ac5d5053c4b6"
        },
        "spec":{
           "pathname":"https://github.com/fxiang1/app-samples.git",
           "type":"GitHub"
        }
     }
  ]
}

describe('createDeployableObject', () => {
  const subscription = {
    apiVersion: 'apps.open-cluster-management.io/v1',
    kind: 'Subscription',
    metadata: {
      annotations: {
        'apps.open-cluster-management.io/deployables': 'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset,cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      },
      labels: { app: 'cassandra-app-cassandra' },
      name: 'cassandra-app-subscription',
      namespace: 'cassandra-app-ns',
    },
    spec: {
      channel: 'cassandra-ch/cassandra-channel',
    },
    status: {
      ansiblejobs: {
        prehookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'],
        posthookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service'],
      },
      lastUpdateTime: '2020-09-18T18:20:03Z',
      phase: 'Propagated',
      statuses: { fxiang: {}, 'kcormier-cluster': [{}] },
    },
    deployablePaths: [
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset',
    ],
  };

  it('createDeployableObject', () => {
    const result = {
      id: 'member--deployable--parentId--ansiblejob--cassandra-app-subscription-cassandra-cassandra-service',
      name: 'cassandra-app-subscription-cassandra-cassandra-service',
      namespace: 'cassandra-app-ns',
      specs: {
        isDesign: false,
        raw: {
          kind: 'AnsibleJob',
          metadata: {
            name: 'cassandra-app-subscription-cassandra-cassandra-service',
            namespace: 'cassandra-app-ns',
          },
          spec: {},
        },
      },
      type: 'ansiblejob',
      uid: 'member--deployable--parentId--ansiblejob--cassandra-app-subscription-cassandra-cassandra-service',
    };
    expect(createDeployableObject(subscription, 'cassandra-app-subscription-cassandra-cassandra-service', 'cassandra-app-ns', 'AnsibleJob', {}, 'parentId', [], [], 'hook')).toEqual(result);
  });
});

describe('isPrePostHookDeployable', () => {
  const subscription = {
    apiVersion: 'apps.open-cluster-management.io/v1',
    kind: 'Subscription',
    metadata: {
      annotations: {
        'apps.open-cluster-management.io/deployables': 'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset,cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      },
      labels: { app: 'cassandra-app-cassandra' },
      name: 'cassandra-app-subscription',
      namespace: 'cassandra-app-ns',
    },
    spec: {
      channel: 'cassandra-ch/cassandra-channel',
    },
    status: {
      ansiblejobs: {
        prehookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'],
        posthookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service'],
      },
      lastUpdateTime: '2020-09-18T18:20:03Z',
      phase: 'Propagated',
      statuses: { fxiang: {}, 'kcormier-cluster': [{}] },
    },
    deployablePaths: [
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset',
    ],
  };

  it('post hook', () => {
    const result = 'post-hook';
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-service', 'cassandra-app-ns')).toEqual(result);
  });

  it('pre hook', () => {
    const result = 'pre-hook';
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-statefulset', 'cassandra-app-ns')).toEqual(result);
  });

  it('no match', () => {
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-service1', 'cassandra-app-ns')).toEqual(null);
  });
});

describe('applicationHelper', () => {
  it('should match snapshot with subscription details', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      subscription: {},
      deployables: [],
    };
    expect(getApplicationElements(getApplicationElementsObj)).toMatchSnapshot();
  });

  it('should match snapshot with subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      subscription: {},
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });

  it('should match snapshot without subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });
});

describe('createReplicaChild', () => {
  it('createReplicaChild', () => {
    const parentObject = {
      id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
      uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
      name: 'redis-slave',
      namespace: 'open-cluster-management',
      type: 'deployment',
      specs:
      {
        isDesign: false,
        raw: {
          kind: 'Deployment',
          metadata: {
            name: 'redis-master',
            namespace: 'open-cluster-management',
          },
          spec: { replicas: 3 },
        },
      },
    };
    const template = {
      kind: 'Deployment',
      metadata: { name: 'redis-slave', namespace: 'open-cluster-management' },
      spec: {
        availableReplicas: 2,
        observedGeneration: 2,
        readyReplicas: 2,
        replicas: 2,
        updatedReplicas: 2,
      },
    };

    const result = {
      id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave',
      name: 'redis-slave',
      namespace: 'open-cluster-management',
      specs: {
        isDesign: false,
        parent: {
          parentId: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
          parentName: 'redis-slave',
          parentType: 'deployment',
        },
        raw: {
          kind: 'replicaset',
          metadata: {
            name: 'redis-slave',
            namespace: 'open-cluster-management',
          },
          spec: {
            desired: 2,
            template: {},
          },
        },
      },
      type: 'replicaset',
      uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave',
    };
    expect(createReplicaChild(parentObject, template, [], [])).toEqual(result);
  });
});

describe('createIngressRouteChild', () => {
  it('creates a Route object and links it to Ingress', () => {
    const parentObject = {
      id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--ingress--nginx-virtual-placement',
      uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--ingress--nginx-virtual-placement',
      name: 'nginx-virtual-placement',
      namespace: 'open-cluster-management',
      type: 'ingress',
      specs:
      {
        isDesign: false,
        raw: {
          kind: 'Ingress',
          metadata: {
            name: 'nginx-virtual-placement',
            namespace: 'open-cluster-management',
          },
          spec:
          {
            rules: [
              {
                host: 'a.b.c',
              },
            ],
          },
        },
      },
    };
    const template = {
      kind: 'Ingress',
      metadata: { name: 'nginx-virtual-placement', namespace: 'open-cluster-management' },
      spec: {
        rules: [
          {
            host: 'a.b.c',
          },
        ],
      },
    };

    const result = {
      id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--route--nginx-virtual-placement',
      name: 'nginx-virtual-placement',
      namespace: 'open-cluster-management',
      specs: {
        isDesign: false,
        parent: {
          parentId: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--ingress--nginx-virtual-placement',
          parentName: 'nginx-virtual-placement',
          parentType: 'ingress',
        },
        raw: {
          kind: 'Route',
          metadata: {
            name: 'nginx-virtual-placement',
            namespace: 'open-cluster-management',
          },
          spec: {
            rules: [
              {
                host: 'a.b.c',
              },
            ],
          },
        },
      },
      type: 'route',
      uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--route--nginx-virtual-placement',
    };
    expect(createIngressRouteChild(parentObject, template, [], [])).toEqual(result);
  });
});

describe('createGenericPackageObject', () => {
  it('createGenericPackageObject', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'obj-sub-ns';
    const subscriptionName = 'obj-sub';

    const result = {
      id: 'member--package--Package-obj-sub', name: 'Package-obj-sub', namespace: 'obj-sub-ns', specs: { raw: { isDesign: false, kind: 'Package', metadata: { name: 'Package-obj-sub', namespace: 'obj-sub-ns' } } }, type: 'package', uid: 'member--package--Package-obj-sub',
    };

    expect(createGenericPackageObject(
      parentId, appNamespace,
      [], [], subscriptionName,
    )).toEqual(result);
  });
});

describe('addClusters', () => {
  it('should match clusters', () => {
    const parentId = 'member--subscription--default--mortgagedc-subscription';
    const createdClusterElements = new Set();
    const clusterNames = ['braveman'];
    const clusters = [{
      metadata:
      {
        name: 'braveman',
        namespace: 'braveman-ns',
        selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/braveman-ns/clusters/braveman',
        uid: '7230a560-6a40-4359-b0e9-8b4980327ea4',
        resourceVersion: '6675638',
        creationTimestamp: '2020-04-20T21:41:51Z',
        labels: {},
        annotations: {},
        finalizers: [],
      },
      status: 'ok',
      clusterip: 'api.brave-man.dev06.red-chesterfield.com',
      consoleURL: 'https://console-openshift-console.apps.brave-man.dev06.red-chesterfield.com',
      capacity: {
        cpu: '36', memory: '140809Mi',
      },
      allocatable: {
        cpu: '12682m', memory: '28464Mi',
      },
      rawCluster: { metadata: {}, spec: {}, status: {} },
      rawStatus: { metadata: {}, spec: {} },
      serverAddress: undefined,
    },
    ];

    const result = 'member--clusters--braveman';
    expect(addClusters(
      parentId, createdClusterElements, {},
      clusterNames, clusters, [], [],
    )).toEqual(result);
  });
});

describe('addSubscriptionDeployable', () => {
  it('addSubscriptionDeployable', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployable = {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        annotations:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/deployable-version': 'apps.openshift.io/v1',
            'apps.open-cluster-management.io/external-source': 'mortgagedc',
            'apps.open-cluster-management.io/is-local-deployable': 'false',
          },
        creationTimestamp: '2020-05-27T14:22:28Z',
        generation: 1,
        labels:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/channel-type': 'GitHub',
            'apps.open-cluster-management.io/subscription': 'default-mortgagedc-subscription',
          },
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        namespace: 'default',
        ownerReferences: [{}],
        resourceVersion: '51745834',
        selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/deployables/mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'DeploymentConfig',
            metadata: {},
            spec: {},
          },
      },
    };

    const result = {
      id: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
      name: undefined,
      namespace: 'default',
      specs: {
        deployStatuses: [],
        isDesign: false,
        raw: {
          apiVersion: 'apps.openshift.io/v1', kind: 'DeploymentConfig', metadata: {}, spec: {},
        },
      },
      type: 'deploymentconfig',
      uid: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
    };

    expect(addSubscriptionDeployable(
      parentId, deployable, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('addSubscriptionDeployable with parent node', () => {
  it('should addSubscriptionDeployable with parent info', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployable = {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        annotations:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/deployable-version': 'apps.openshift.io/v1',
            'apps.open-cluster-management.io/external-source': 'mortgagedc',
            'apps.open-cluster-management.io/is-local-deployable': 'false',
          },
        creationTimestamp: '2020-05-27T14:22:28Z',
        generation: 1,
        labels:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/channel-type': 'GitHub',
            'apps.open-cluster-management.io/subscription': 'default-mortgagedc-subscription',
          },
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        namespace: 'default',
        ownerReferences: [{}],
        resourceVersion: '51745834',
        selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/deployables/mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'DeploymentConfig',
            metadata: {},
            spec: {},
          },
      },
    };

    const nodes = [
      {
        id: parentId,
        name: 'braveman',
        type: 'cluster',
      },
    ];
    const result = {
      id: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
      name: undefined,
      namespace: 'default',
      specs: {
        deployStatuses: [],
        isDesign: false,
        parent: {
          parentId: 'member--clusters--braveman',
          parentName: 'braveman',
          parentType: 'cluster',
        },
        raw: {
          apiVersion: 'apps.openshift.io/v1', kind: 'DeploymentConfig', metadata: {}, spec: {},
        },
      },
      type: 'deploymentconfig',
      uid: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
    };

    expect(addSubscriptionDeployable(
      parentId, deployable, [], nodes,
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for Route', () => {
  it('processServiceOwner for Route', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Route',
            metadata: {},
            spec: {
              to: {
                name: 'service1',
              },
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Route',
            metadata: {},
            spec: {
            },
          },
      },
    },
    ];

    const result = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route--route--undefined' };

    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for StatefulSet', () => {
  it('processServiceOwner for StatefulSet', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'StatefulSet',
            spec: {
              serviceName: 'aaa',
            },
            metadata: {},
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'StatefulSet',
            metadata: {},
            spec: {
            },
          },
      },
    },
    ];

    const result = {
      aaa: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route--statefulset--undefined',
    };
    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for Ingress', () => {
  it('processServiceOwner for Ingress', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                        serviceName: 'service1',
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
              ],
            },
          },
      },
    },
    ];

    const result = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress--ingress--undefined' };
    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServices', () => {
  it('processServices', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-service1',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
        spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Service',
            metadata: {
              name: 'service1',
            },
          },
      },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-service2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
        spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Service',
            metadata: {
              name: 'service2',
            },
          },
      },
      },
    ];
    const servicesMap = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress--ingress--undefined' };

    expect(processServices(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace, servicesMap, null,
    )).toEqual(undefined);
  });
});

describe('processDeployables', () => {
  it('processDeployables', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                        serviceName: 'service1',
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    }];

    expect(processDeployables(
      deployables, parentId, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(undefined);
  });
});

describe('addSubscriptionCharts', () => {
  it('addSubscriptionCharts', () => {
    const parentId = 'member--clusters--possiblereptile, braveman, sharingpenguin, relievedox';
    const appNamespace = 'open-cluster-management';
    const channelInfo = 'gb-app-latest-ns/guestbook-app-latest';
    const subscriptionName = 'guestbook-app';
    const topo = 'deployable//HelmRelease//nginx-2.2.2/0,helmchart/nginx-fdab7-/Deployment/demo-ns-helm-git/nginx-deployment/2';

    const subscriptionStatusMap = {
      braveman:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Failed',
       reason: 'subscriptions.apps.open-cluster-management.io "sub123" not found',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      possiblereptile:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Failed',
       reason: 'subscriptions.apps.open-cluster-management.io "guestbook-redis" not found',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:15:57Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:15:56Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:15:58Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      relievedox:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      sharingpenguin:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
    };
    const result = [
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--frontend',
        name: 'frontend',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'frontend',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--frontend',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-master',
        name: 'redis-master',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'redis-master',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-master',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
        name: 'redis-slave',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'redis-slave',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--frontend',
        name: 'frontend',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'frontend',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--frontend',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-master',
        name: 'redis-master',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'redis-master',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-master',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-slave',
        name: 'redis-slave',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'redis-slave',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-slave',

      },
    ];

    expect(addSubscriptionCharts(
      parentId, subscriptionStatusMap,
      [], [], null, appNamespace, channelInfo, subscriptionName, null,
    )).toEqual(result);

    const result2 = [
      {
        name: 'nginx-deployment',
        namespace: 'open-cluster-management',
        type: 'deployment',
        id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
        uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
        specs: {
          raw: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
              name: 'nginx-deployment',
              namespace: 'demo-ns-helm-git',
            },
            spec: {
              replicas: 2,
            },
          },
          deployStatuses: [],
          isDesign: false,
          parent: undefined,
        },
      },
      {
        name: 'nginx-deployment',
        namespace: 'open-cluster-management',
        type: 'replicaset',
        id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--nginx-deployment',
        uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--nginx-deployment',
        specs: {
          isDesign: false,
          parent: {
            parentId: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
            parentName: 'nginx-deployment',
            parentType: 'deployment',
          },
          raw: {
            kind: 'replicaset',
            metadata: {
              name: 'nginx-deployment',
              namespace: 'open-cluster-management',
            },
            spec: {
              desired: 2,
              template: {},
            },
          },
        },
      },
    ];
    expect(addSubscriptionCharts(
      parentId, subscriptionStatusMap,
      [], [], null, appNamespace, channelInfo, subscriptionName, topo,
    )).toEqual(result2);
  });
});

describe('getSubscriptionPackageInfo', () => {
  it('getSubscriptionPackageInfo', () => {
    const topoAnnotation = 'helmchart/nginx-ingress-4f527-/Service/ns-sub-1/default-backend/0,helmchart/nginx-ingress-4f527-/Deployment/ns-sub-1/controller/1';
    const subscriptionName = 'nginx';
    const appNs = 'default';

    const result = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'ns-sub-1',
          name: 'nginx-default-backend-default-backend-service',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/ns-sub-1/deployables/default-backend-service',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Service',
            metadata: { namespace: 'ns-sub-1', name: 'default-backend' },
            spec: {},
          },
        },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'ns-sub-1',
          name: 'nginx-controller-controller-deployment',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/ns-sub-1/deployables/controller-deployment',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { namespace: 'ns-sub-1', name: 'controller' },
            spec: { replicas: 1 },
          },
        },
      },
    ];

    expect(getSubscriptionPackageInfo(topoAnnotation, subscriptionName, appNs)).toEqual(result);
  });
});

describe('getSubscriptionPackageInfo git helm', () => {
  it('getSubscriptionPackageInfo git helm', () => {
    const topoAnnotation = 'deployable//HelmRelease//nginx-2.2.2/0,helmchart/nginx-fdab7-/Deployment/demo-ns-helm-git/nginx-deployment/2';
    const subscriptionName = 'demo-subscription';
    const channelInfo = 'demo-ns-helm-git-ch/git-helm-ch';

    const result = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'demo-ns-helm-git',
          name: 'demo-subscription-nginx-deployment-nginx-deployment-deployment',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/demo-ns-helm-git/deployables/nginx-deployment-deployment',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { namespace: 'demo-ns-helm-git', name: 'nginx-deployment' },
            spec: { replicas: 2 },
          },
        },
      },
    ];

    expect(getSubscriptionPackageInfo(topoAnnotation, subscriptionName, 'default', channelInfo)).toEqual(result);
  });
});

describe('removeReleaseGeneratedSuffix remove suffix', () => {
  it('removeReleaseGeneratedSuffix remove suffix', () => {
    expect(removeReleaseGeneratedSuffix('nginx-ingress-66f46')).toEqual('nginx-ingress');
  });
});

describe('removeHelmReleaseName test resource with only release name as the name', () => {
  it('removeHelmReleaseName test resource with only release name as the name', () => {
    expect(removeHelmReleaseName('nginx-ingress-66f46', 'nginx-ingress-66f46')).toEqual('nginx-ingress');
  });
});

describe('getLocalClusterElement cluster element exists', () => {
  it('should get the local cluster element', () => {
    const createdClusterElements = new Set(['member--clusters--cluster1, cluster2, local-cluster']);
    expect(getLocalClusterElement(createdClusterElements)).toEqual('member--clusters--cluster1, cluster2, local-cluster');
  });
});

describe('getLocalClusterElement cluster element does not exists', () => {
  it('should not get the local cluster element', () => {
    const createdClusterElements = new Set(['member--clusters--cluster1, cluster2']);
    expect(getLocalClusterElement(createdClusterElements)).toEqual(undefined);
  });
});
