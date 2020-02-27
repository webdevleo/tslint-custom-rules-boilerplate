import {Configuration, Linter, Replacement} from 'tslint';

export const helper = ({src, rule, fileName = ''}) => {
    const linter = new Linter({fix: false});

    linter.lint(fileName, src, Configuration.parseConfigFile({
        rules: {
            [rule.name || rule]: [true, (typeof rule === 'object' && rule.options || [])]
        },
        rulesDirectory: ['src/rules/', 'src/utils/'],
    }));

    return linter.getResult();
};

export const getFixedResult = ({src, rule, fileName = ''}) => {
    const result = helper({src, rule, fileName});
    return Replacement.applyFixes(src, [result.failures[0].getFix()]);
};
