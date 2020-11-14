'use strict';

const {homepage} = require('./package.json');
const rules = require('./dist/rules');

const ruleListItems = Object.keys(rules).sort().map(key => {
    const {metadata} = rules[key];
    const {ruleName, description} = metadata;
    return `* [${ruleName}](${homepage}src/rules/${key}/README.md): ${description}`;
});

const BASIC_RULES = () => ruleListItems.filter(rule => !rule.includes('jsx-')).join('\n');
const JSX_RULES = () => ruleListItems.filter(rule => rule.includes('jsx-')).join('\n')

module.exports = {
    transforms: {
        BASIC_RULES,
        JSX_RULES
    },
    callback: () => {
        console.log('The auto-generating of rules finished!');
    }
};
