const query = {
  Action: { Names: '*' },
};

const hcmResponse = {
  RetString: '{"Result":{"fundtrader":{"Name":"fundtrader","Dashboard":"","Status":"registered","Labels":{"APPLICATION":"","fundtrader":"","instance":""},"Annotations":{"description":"Fund Trader Application","status":"registered","type":"instance"},"Components":[{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},{"Name":"redis-fund","Cluster":"toronto","Kind":"CACHESERVICE","Dashboard":"","Status":""}],"Dependencies":[{"Name":"odm","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},{"Name":"mq","Cluster":"toronto","Kind":"MESSAGEQUEUE","Dashboard":"","Status":""},{"Name":"db2","Cluster":"toronto","Kind":"DATABASESERVICE","Dashboard":"","Status":""}],"Relationships":[{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"odm","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"mq","Cluster":"toronto","Kind":"MESSAGEQUEUE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"redis-fund","Cluster":"toronto","Kind":"CACHESERVICE","Dashboard":"","Status":""},"Type":"usesCreated","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"db2","Cluster":"toronto","Kind":"DATABASESERVICE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""}]},"players":{"Name":"players","Dashboard":"","Status":"deployed","Labels":{"APPLICATION":"","instance":"","players":""},"Annotations":{"description":"Sample Application for deploy","status":"deployed","type":"instance"},"Components":[{"Name":"player2","Cluster":"myminikube","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":"deployed"},{"Name":"player1","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":"deployed"}],"Dependencies":null,"Relationships":null}},"Error":null}',
  Error: null,
};

const resolverResult = [
  {
    Annotations: {
      description: 'Fund Trader Application',
      status: 'registered',
      type: 'instance',
    },
    Components: [
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'APPLICATIONSERVICE',
        Name: 'fundsrv',
        Status: '',
      },
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'CACHESERVICE',
        Name: 'redis-fund',
        Status: '',
      },
    ],
    Dashboard: '',
    Dependencies: [
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'APPLICATIONSERVICE',
        Name: 'odm',
        Status: '',
      },
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'MESSAGEQUEUE',
        Name: 'mq',
        Status: '',
      },
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'DATABASESERVICE',
        Name: 'db2',
        Status: '',
      },
    ],
    Labels: {
      APPLICATION: '',
      fundtrader: '',
      instance: '',
    },
    Name: 'fundtrader',
    Relationships: [
      {
        End: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'APPLICATIONSERVICE',
          Name: 'odm',
          Status: '',
        },
        Start: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'APPLICATIONSERVICE',
          Name: 'fundsrv',
          Status: '',
        },
        Status: '',
        Type: 'usesExisting',
      },
      {
        End: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'MESSAGEQUEUE',
          Name: 'mq',
          Status: '',
        },
        Start: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'APPLICATIONSERVICE',
          Name: 'fundsrv',
          Status: '',
        },
        Status: '',
        Type: 'usesExisting',
      },
      {
        End: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'CACHESERVICE',
          Name: 'redis-fund',
          Status: '',
        },
        Start: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'APPLICATIONSERVICE',
          Name: 'fundsrv',
          Status: '',
        },
        Status: '',
        Type: 'usesCreated',
      },
      {
        End: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'DATABASESERVICE',
          Name: 'db2',
          Status: '',
        },
        Start: {
          Cluster: 'toronto',
          Dashboard: '',
          Kind: 'APPLICATIONSERVICE',
          Name: 'fundsrv',
          Status: '',
        },
        Status: '',
        Type: 'usesExisting',
      },
    ],
    Status: 'registered',
  },
  {
    Annotations: {
      description: 'Sample Application for deploy',
      status: 'deployed',
      type: 'instance',
    },
    Components: [
      {
        Cluster: 'myminikube',
        Dashboard: '',
        Kind: 'APPLICATIONSERVICE',
        Name: 'player2',
        Status: 'deployed',
      },
      {
        Cluster: 'toronto',
        Dashboard: '',
        Kind: 'APPLICATIONSERVICE',
        Name: 'player1',
        Status: 'deployed',
      },
    ],
    Dashboard: '',
    Dependencies: null,
    Labels: {
      APPLICATION: '',
      instance: '',
      players: '',
    },
    Name: 'players',
    Relationships: null,
    Status: 'deployed',
  },
];

module.exports = { query, hcmResponse, resolverResult };
