// Copyright (c) 2020 Red Hat, Inc.

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';

describe('Channel Resolver', () => {
  test('Correctly Resolves Channels Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          channels {
            metadata {
              labels
              name
              namespace
              uid
              selfLink
              resourceVersion
              creationTimestamp
            }
            type
            secretRef
            objectPath
            raw
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Git Branches Query', () => new Promise((done) => {
    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/fxiang1/app-samples/branches')
      .reply(200, [{ name: 'master', commit: { sha: '0660bd66c02d09a4c8813d3ae2e711fc98b6426b', url: 'https://api.github.com/repos/fxiang1/app-samples/commits/0660bd66c02d09a4c8813d3ae2e711fc98b6426b' }, protected: false }, { name: 'val-b1', commit: { sha: '0c712615cac9b56161f1d94c3d02b17f15b2d102', url: 'https://api.github.com/repos/fxiang1/app-samples/commits/0c712615cac9b56161f1d94c3d02b17f15b2d102' }, protected: false }], [
        'content-type',
        'application/json; charset=utf-8',
        'status',
        '200 OK',
      ]);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            items: gitChannelBranches(gitUrl: "https://github.com/fxiang1/app-samples.git")
          }
        `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.items).toContain('master');
        expect(result.data.items).toContain('val-b1');
        done();
      });
  }));

  test('Correctly Resolves Git Branches Query - Private Repo', () => new Promise((done) => {
    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/KevinFCormier/sample-repo/branches')
      .reply(200, [{ name: 'main', commit: { sha: 'd4b860cdcc7ab89e381a7981f10acee0dd7a7726', url: 'https://api.github.com/repos/KevinFCormier/sample-repo/commits/d4b860cdcc7ab89e381a7981f10acee0dd7a7726' }, protected: false }], [
        'Content-Type',
        'application/json; charset=utf-8',
        'Status',
        '200 OK',
      ]);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            items: gitChannelBranches(gitUrl: "https://github.com/KevinFCormier/sample-repo.git", user: "fakeuser", accessToken: "some-fake-access-token")
          }
        `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.items).toContain('main');
        done();
      });
  }));

  test('Correctly Resolves Git Paths Query', () => new Promise((done) => {
    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/fxiang1/app-samples/branches/val-b1')
      .reply(200, {
        name: 'val-b1',
        commit: {
          sha: '0c712615cac9b56161f1d94c3d02b17f15b2d102',
        },
      }, [
        'content-type',
        'application/json; charset=utf-8',
        'status',
        '200 OK',
      ]);

    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/fxiang1/app-samples/git/trees/0c712615cac9b56161f1d94c3d02b17f15b2d102')
      .query({ recursive: true })
      .reply(200, {
        sha: '0c712615cac9b56161f1d94c3d02b17f15b2d102',
        tree: [
          {
            path: '.gitignore',
            mode: '100644',
            type: 'blob',
            sha: 'e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
            size: 10,
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
          },
          {
            path: 'README.md',
            mode: '100644',
            type: 'blob',
            sha: '99b092378c3d399323d314dde3a9712579c8a17c',
            size: 510,
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/99b092378c3d399323d314dde3a9712579c8a17c',
          },
          {
            path: 'helloworld',
            mode: '040000',
            type: 'tree',
            sha: '0e3648036b53baf8a078050db0c939fd55d8e9e5',
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/0e3648036b53baf8a078050db0c939fd55d8e9e5',
          },
          {
            path: 'mortgage',
            mode: '040000',
            type: 'tree',
            sha: 'b51bae5b6e6f199c8bbdde7aedc192e709cc685f',
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/b51bae5b6e6f199c8bbdde7aedc192e709cc685f',
          },
          {
            path: 'nginx',
            mode: '040000',
            type: 'tree',
            sha: '9e69b59cc9d07c5dd7a57aa1e40dc698628023f5',
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/9e69b59cc9d07c5dd7a57aa1e40dc698628023f5',
          },
          {
            path: 'sample-nginx-blue',
            mode: '040000',
            type: 'tree',
            sha: '4034d7a3eb80823ff33cf27b46bcddadb3525c43',
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/4034d7a3eb80823ff33cf27b46bcddadb3525c43',
          },
          {
            path: 'sample-nginx-green',
            mode: '040000',
            type: 'tree',
            sha: 'c355b950d08b4c223c60d3cbbe2e752ebe0074b8',
            url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/c355b950d08b4c223c60d3cbbe2e752ebe0074b8',
          },
        ],
      }, [
        'content-type',
        'application/json; charset=utf-8',
        'status',
        '200 OK',
      ]);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            items: gitChannelPaths(gitUrl: "https://github.com/fxiang1/app-samples.git", branch: "val-b1")
          }
        `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.items).toContain('helloworld');
        expect(result.data.items).toContain('mortgage');
        expect(result.data.items).toContain('nginx');
        expect(result.data.items).toContain('sample-nginx-green');
        done();
      });
  }));

  test('Correctly Resolves Git Paths Query - Private Repo From Secret', () => new Promise((done) => {
    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/KevinFCormier/sample-repo/branches/main')
      .reply(200, {
        name: 'main',
        commit: {
          sha: '0c712615cac9b56161f1d94c3d02b17f15b2d102',
        },
      }, [
        'content-type',
        'application/json; charset=utf-8',
        'status',
        '200 OK',
      ]);

    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/KevinFCormier/sample-repo/git/trees/0c712615cac9b56161f1d94c3d02b17f15b2d102')
      .query({ recursive: true })
      .reply(200, {
        sha: '0c712615cac9b56161f1d94c3d02b17f15b2d102',
        tree: [
          {
            path: '.gitignore',
            mode: '100644',
            type: 'blob',
            sha: 'e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
            size: 10,
            url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/blobs/e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
          },
          {
            path: 'README.md',
            mode: '100644',
            type: 'blob',
            sha: '99b092378c3d399323d314dde3a9712579c8a17c',
            size: 510,
            url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/blobs/99b092378c3d399323d314dde3a9712579c8a17c',
          },
          {
            path: 'folder-2-a',
            mode: '040000',
            type: 'tree',
            sha: '0e3648036b53baf8a078050db0c939fd55d8e9e5',
            url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/0e3648036b53baf8a078050db0c939fd55d8e9e5',
          },
          {
            path: 'folder-2-b',
            mode: '040000',
            type: 'tree',
            sha: 'b51bae5b6e6f199c8bbdde7aedc192e709cc685f',
            url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/b51bae5b6e6f199c8bbdde7aedc192e709cc685f',
          },
        ],
      }, [
        'content-type',
        'application/json; charset=utf-8',
        'status',
        '200 OK',
      ]);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            items: gitChannelPaths(gitUrl: "https://github.com/KevinFCormier/sample-repo.git", branch: "main", path: "folder-1-b", namespace: "ggithubcom-kevinfcormier-sample-repo-ns", secretRef: "ggithubcom-kevinfcormier-sample-repo-auth")
          }
        `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.items).toContain('folder-2-a');
        expect(result.data.items).toContain('folder-2-b');
        done();
      });
  }));
});
