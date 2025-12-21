const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')
const chalk = require('chalk')
const swc = require('@swc/core')
const fs = require('fs')

const publish = process.argv.includes('--publish')
const sourcemap = publish ? false : process.argv.includes('--sourcemap')
const minify = publish ? true : process.argv.includes('--minify')
const watch = publish ? false : process.argv.includes('--watch')

const outfile = publish ? 'docs/tdownloader/main.js' : 'dist/main.js'

;(async () => {
    const ctx = await esbuild.context({
        entryPoints: ['src/main.ts'],
        bundle: true,
        outfile: outfile,
        target: 'es2015',
        sourcemap: sourcemap,
        sourcesContent: false,
        sourceRoot: '/src',
        plugins: [
            sassPlugin({
                type: 'css-text',
            }),
            {
                name: 'rebuild-notify',
                setup(build) {
                    build.onEnd(async (result) => {
                        if (result.errors.length > 0) {
                            console.log(chalk.red(`Build ended with ${result.errors.length} errors`))
                        } else {
                            console.log(chalk.green('Build completed successfully!'))
                            
                            // При publish создаем ES5 версию
                            if (publish) {
                                console.log(chalk.blue('Creating ES5 version...'))
                                try {
                                    const es6Code = fs.readFileSync(outfile, 'utf-8')
                                    const es5Result = await swc.transform(es6Code, {
                                        jsc: {
                                            target: 'es5',
                                            parser: {
                                                syntax: 'ecmascript',
                                            },
                                        },
                                        minify: minify,
                                    })
                                    
                                    const es5File = outfile.replace('.js', '.es5.js')
                                    fs.writeFileSync(es5File, es5Result.code)
                                    console.log(chalk.green('ES5 version created: ' + es5File))
                                } catch (err) {
                                    console.log(chalk.red('ES5 transpilation failed:'), err.message)
                                }
                            }
                        }
                    })
                },
            },
        ],
        loader: {
            '.html': 'text',
            '.css': 'text',
            '.json': 'json',
            '.svg': 'text',
        },
        minify: minify,
    })

    if (watch) {
        await ctx.watch()
        console.log('Watching for changes...')
    } else {
        await ctx.rebuild()
        await ctx.dispose()
    }
})()
