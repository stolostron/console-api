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
      .get('/repos/fxiang1/app-samples/contents/')
      .query({ ref: 'val-b1' })
      .reply(200, [{
        name: '.gitignore', path: '.gitignore', sha: 'e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf', size: 10, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/.gitignore?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/blob/val-b1/.gitignore', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf', download_url: 'https://raw.githubusercontent.com/fxiang1/app-samples/val-b1/.gitignore', type: 'file', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/.gitignore?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf', html: 'https://github.com/fxiang1/app-samples/blob/val-b1/.gitignore' },
      }, {
        name: 'README.md', path: 'README.md', sha: '99b092378c3d399323d314dde3a9712579c8a17c', size: 510, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/README.md?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/blob/val-b1/README.md', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/99b092378c3d399323d314dde3a9712579c8a17c', download_url: 'https://raw.githubusercontent.com/fxiang1/app-samples/val-b1/README.md', type: 'file', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/README.md?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/99b092378c3d399323d314dde3a9712579c8a17c', html: 'https://github.com/fxiang1/app-samples/blob/val-b1/README.md' },
      }, {
        name: 'helloworld', path: 'helloworld', sha: '0e3648036b53baf8a078050db0c939fd55d8e9e5', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/helloworld?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/helloworld', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/0e3648036b53baf8a078050db0c939fd55d8e9e5', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/helloworld?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/0e3648036b53baf8a078050db0c939fd55d8e9e5', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/helloworld' },
      }, {
        name: 'index.yaml', path: 'index.yaml', sha: '3070c5eb626061a2f60d316d7e8747e8da616846', size: 4841, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/index.yaml?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/blob/val-b1/index.yaml', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/3070c5eb626061a2f60d316d7e8747e8da616846', download_url: 'https://raw.githubusercontent.com/fxiang1/app-samples/val-b1/index.yaml', type: 'file', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/index.yaml?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/blobs/3070c5eb626061a2f60d316d7e8747e8da616846', html: 'https://github.com/fxiang1/app-samples/blob/val-b1/index.yaml' },
      }, {
        name: 'mortgage', path: 'mortgage', sha: 'b51bae5b6e6f199c8bbdde7aedc192e709cc685f', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgage?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgage', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/b51bae5b6e6f199c8bbdde7aedc192e709cc685f', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgage?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/b51bae5b6e6f199c8bbdde7aedc192e709cc685f', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgage' },
      }, {
        name: 'mortgagerc', path: 'mortgagerc', sha: 'be7e4a517e56f6388edcab4e03aea983ac92e52f', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgagerc?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgagerc', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/be7e4a517e56f6388edcab4e03aea983ac92e52f', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgagerc?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/be7e4a517e56f6388edcab4e03aea983ac92e52f', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgagerc' },
      }, {
        name: 'mortgagers', path: 'mortgagers', sha: 'b8e0233b356aee08479e35ba58af2811f73b843e', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgagers?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgagers', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/b8e0233b356aee08479e35ba58af2811f73b843e', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/mortgagers?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/b8e0233b356aee08479e35ba58af2811f73b843e', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/mortgagers' },
      }, {
        name: 'nginx', path: 'nginx', sha: '9e69b59cc9d07c5dd7a57aa1e40dc698628023f5', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/nginx?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/nginx', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/9e69b59cc9d07c5dd7a57aa1e40dc698628023f5', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/nginx?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/9e69b59cc9d07c5dd7a57aa1e40dc698628023f5', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/nginx' },
      }, {
        name: 'resources-roke', path: 'resources-roke', sha: '38c93ff5fc6c5ca0117acb629d0847f9dbb17cb4', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/resources-roke?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/resources-roke', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/38c93ff5fc6c5ca0117acb629d0847f9dbb17cb4', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/resources-roke?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/38c93ff5fc6c5ca0117acb629d0847f9dbb17cb4', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/resources-roke' },
      }, {
        name: 'sample-nginx-green', path: 'sample-nginx-green', sha: 'c355b950d08b4c223c60d3cbbe2e752ebe0074b8', size: 0, url: 'https://api.github.com/repos/fxiang1/app-samples/contents/sample-nginx-green?ref=val-b1', html_url: 'https://github.com/fxiang1/app-samples/tree/val-b1/sample-nginx-green', git_url: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/c355b950d08b4c223c60d3cbbe2e752ebe0074b8', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/fxiang1/app-samples/contents/sample-nginx-green?ref=val-b1', git: 'https://api.github.com/repos/fxiang1/app-samples/git/trees/c355b950d08b4c223c60d3cbbe2e752ebe0074b8', html: 'https://github.com/fxiang1/app-samples/tree/val-b1/sample-nginx-green' },
      }], [
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
        expect(result.data.items).toBeNull();
        // expect(result.data.items).toContain('helloworld');
        // expect(result.data.items).toContain('mortgage');
        // expect(result.data.items).toContain('nginx');
        // expect(result.data.items).toContain('sample-nginx-green');
        done();
      });
  }));

  test('Correctly Resolves Git Paths Query - Private Repo From Secret', () => new Promise((done) => {
    nock('https://api.github.com:443', { encodedQueryParams: true })
      .get('/repos/KevinFCormier/sample-repo/contents/folder-1-b')
      .query({ ref: 'main' })
      .reply(200, [{
        name: 'folder-2-a', path: 'folder-1-b/folder-2-a', sha: '5a1a01fbc1e8af36bdbcb65518dcf59663d85bbe', size: 0, url: 'https://api.github.com/repos/KevinFCormier/sample-repo/contents/folder-1-b/folder-2-a?ref=main', html_url: 'https://github.com/KevinFCormier/sample-repo/tree/main/folder-1-b/folder-2-a', git_url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/5a1a01fbc1e8af36bdbcb65518dcf59663d85bbe', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/KevinFCormier/sample-repo/contents/folder-1-b/folder-2-a?ref=main', git: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/5a1a01fbc1e8af36bdbcb65518dcf59663d85bbe', html: 'https://github.com/KevinFCormier/sample-repo/tree/main/folder-1-b/folder-2-a' },
      }, {
        name: 'folder-2-b', path: 'folder-1-b/folder-2-b', sha: '9def41a6dea10107220a59212ef8cd1a9e194597', size: 0, url: 'https://api.github.com/repos/KevinFCormier/sample-repo/contents/folder-1-b/folder-2-b?ref=main', html_url: 'https://github.com/KevinFCormier/sample-repo/tree/main/folder-1-b/folder-2-b', git_url: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/9def41a6dea10107220a59212ef8cd1a9e194597', download_url: null, type: 'dir', _links: { self: 'https://api.github.com/repos/KevinFCormier/sample-repo/contents/folder-1-b/folder-2-b?ref=main', git: 'https://api.github.com/repos/KevinFCormier/sample-repo/git/trees/9def41a6dea10107220a59212ef8cd1a9e194597', html: 'https://github.com/KevinFCormier/sample-repo/tree/main/folder-1-b/folder-2-b' },
      }], [
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
            items: gitChannelPaths(gitUrl: "https://github.com/KevinFCormier/sample-repo.git", branch: "main", path: "folder-1-b", namespace: "ggithubcom-kevinfcormier-sample-repo-ns", secretRef: "ggithubcom-kevinfcormier-sample-repo-auth")
          }
        `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.items).toBeNull();
        // expect(result.data.items).toContain('folder-2-a');
        // expect(result.data.items).toContain('folder-2-b');
        done();
      });
  }));
});
