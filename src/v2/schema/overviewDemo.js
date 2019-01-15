/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const generateDemoData = () => {
  let pods = [];
  const clusters = [
    {
      c: 'AWS', e: 'Dev', r: 'US', v: 'RHOL', s: 'ok', cu: '12', uu: '9299m', n: '2', cm: '24029Mi', um: '7029Mi', ct: '80Gi', ut: '60Gi', p: '89',
    },
    {
      c: 'AWS', e: 'Test', r: 'AP', v: 'IKE', s: 'ok', cu: '8', uu: '5299m', n: '2', cm: '24029Mi', um: '19029Mi', ct: '180Gi', ut: '100Gi', p: '189',
    },
    {
      c: 'AWS', e: 'Prod', r: 'AP', v: 'ICP', s: 'ok', cu: '22', uu: '17299m', n: '2', cm: '24029Mi', um: '5029Mi', ct: '80Gi', ut: '80Gi', p: '59',
    },
    {
      c: 'Azure', e: 'Dev', r: 'US', v: 'ICP', s: 'offline', cu: '8', uu: '7299m', n: '2', cm: '24029Mi', um: '17029Mi', ct: '60Gi', ut: '20Gi', p: '39',
    },
    {
      c: 'Azure', e: 'Prod', r: 'AP', v: 'RKE', s: 'ok', cu: '32', uu: '27299m', n: '2', cm: '24029Mi', um: '12029Mi', ct: '80Gi', ut: '60Gi', p: '49',
    },
    {
      c: 'Google', e: 'Dev', r: 'AP', v: 'ICP', s: 'ok', cu: '12', uu: '7299m', n: '2', cm: '24029Mi', um: '9029Mi', ct: '100Gi', ut: '80Gi', p: '289',
    },
    {
      c: 'IBM', e: 'Dev', r: 'US', v: 'ICP', s: 'ok', cu: '8', uu: '3299m', n: '2', cm: '24029Mi', um: '6029Mi', ct: '80Gi', ut: '80Gi', p: '39',
    },
    {
      c: 'IBM', e: 'Test', r: 'AP', v: 'ICP', s: 'ok', cu: '24', uu: '16299m', n: '2', cm: '24029Mi', um: '17029Mi', ct: '120Gi', ut: '100Gi', p: '79',
    },
    {
      c: 'IBM', e: 'Prod', r: 'AP', v: 'ICP', s: 'ok', cu: '12', uu: '7299m', n: '2', cm: '24029Mi', um: '17029Mi', ct: '60Gi', ut: '40Gi', p: '99',
    },
    {
      c: 'IBM', e: 'Dev', r: 'US', v: 'IKE', s: 'ok', cu: '8', uu: '2299m', n: '2', cm: '24029Mi', um: '17029Mi', ct: '20Gi', ut: '10Gi', p: '39',
    },
    {
      c: 'huawei', e: 'Dev', r: 'AP', v: 'ICP', s: 'ok', cu: '12', uu: '7299m', n: '2', cm: '24029Mi', um: '17029Mi', ct: '280Gi', ut: '10Gi', p: '189',
    },
  ].map(({
    c, e, r, v, s, cu, uu, n, cm, um, ct, ut, p,
  }, idx) => {
    const name = `cluster${idx}`;

    // add pods
    pods = [...pods, ...Array.from({ length: p }, (x, k) => ({
      metadata: {
        name: `pod${k}`,
        namespace: 'default',
      },
      cluster: {
        metadata: {
          name,
        },
      },
      status: 'Running',
    }))];

    // return clusters
    return {
      metadata: {
        name,
        namespace: name,
        labels: {
          cloud: c,
          environment: e,
          name,
          region: r,
          vendor: v,
        },
      },
      status: s,
      capacity: {
        cpu: cu,
        memory: cm,
        nodes: n,
        storage: ct,
      },
      usage: {
        cpu: uu,
        memory: um,
        pods: p,
        storage: ut,
      },
    };
  });


  const applications = Array.from({ length: 27 }, (v, k) => ({ metadata: { name: `app${k}` } }));

  const statuses = {};
  const compliances = [{
    raw: {
      status: {
        status: statuses,
      },
    },
  }];
  [
    {
      c: 'cluster2', e: 'Compliant',
    },
    {
      c: 'cluster5', e: 'Compliant',
    },
    {
      c: 'cluster8', e: 'Non-Compliant',
    },
  ].forEach(({ c, e }) => {
    statuses[c] = {
      name: c,
      compliant: e,
    };
  });


  const timestamp = new Date().toString();
  return {
    clusters, applications, compliances, pods, timestamp,
  };
};

export default generateDemoData;
