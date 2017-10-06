'use strict';
const simpleGit = require('simple-git/promise');
const { table } = require('table');
const repos = require('./config');

const data = {};

const logTable = () => {
    const groups = Object.keys(data);
    groups.forEach(group => {
        data[group] = data[group].sort((a, b) => {
            if(a[0] < b[0]) return -1;
            if(a[0] > b[0]) return 1;
            return 0;
        });
        data[group].unshift(['Project', 'Branch', 'Behind/Ahead', 'Local changes']);
        console.log(table([[group]]));
        console.log(table(data[group]));
    })
};

const stringifyBehindAhead = (behind, ahead) => {
    let state = '|';
    for (var i = 0; i < behind; i++) { state = '-' + state; }
    for (var i = 0; i < ahead; i++) { state += '-'; }
    state = '<' + state + '>';
    return state;
};

const pushToTable = (repo, status) => {
    if (!data.hasOwnProperty(repo.group)) {
        data[repo.group] = [];
    }
    const aheadBehind = stringifyBehindAhead(status.behind, status.ahead);
    const localChanges = status.files.length ? `${status.files.length} files` : '-';
    data[repo.group].push([repo.name, status.current, aheadBehind, localChanges])
};

let amountReposDone = 0;
const execGitRepository = (repo) => {
    const git = simpleGit(repo.path);
    git.status((error, status) => {
        pushToTable(repo, status);
        amountReposDone++;

        if (amountReposDone >= repos.length) {
            logTable();
        }
    });
};

repos.forEach(repo => execGitRepository(repo));