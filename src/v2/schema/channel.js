/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `

#Channel
type Channel implements K8sObject {
  namespace: String
  #Defines how the Channel is implemnted, it could be ObjectBucket(a bucket in object store) or HelmRepo.
  type: String
  #Defines the actual path name to the channel, it could be url to the bucket or url to the helm repository.
  objectPath: String 
  #Defines the required credentials to access channel. The secret should sit inside the channel namespace.
  secretRef: String
  metadata: Metadata
  raw: JSON
  selector: JSON  
}

`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    channels: (root, args, { channelModel }) => channelModel.getChannels(args.name, args.namespace),
  },
  Mutation: {
    createChannel: (root, args, { channelModel }) => channelModel.createChannel(args.resources),
  },
};
