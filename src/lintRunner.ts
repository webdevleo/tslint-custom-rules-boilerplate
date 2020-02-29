import {Configuration, Linter, Replacement} from 'tslint';

export const helper = ({src, rule, fileName = ''}) => {
    const linter = new Linter({fix: false});
    const options = typeof rule === 'object' && rule.options ? rule.options : [];

    linter.lint(fileName, src, Configuration.parseConfigFile({
        rules: {
            [rule.name || rule]: [true, ...options]
        },
        rulesDirectory: ['src/rules/', 'src/utils/'],
    }));

    return linter.getResult();
};

export const getFixedResult = ({src, rule, fileName = ''}) => {
    const result = helper({src, rule, fileName});
    return Replacement.applyFixes(src, [result.failures[0].getFix()]);
};
