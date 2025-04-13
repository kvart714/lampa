const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')
const chalk = require('chalk')

const publish = process.argv.includes('--publish')
const sourcemap = publish ? false : process.argv.includes('--sourcemap')
const minify = publish ? true : process.argv.includes('--minify')
const watch = publish ? false : process.argv.includes('--watch')

const outfile = publish ? 'publish/tdownloader/main.js' : 'dist/main.js'

;(async () => {
    const ctx = await esbuild.context({
        entryPoints: ['src/main.ts'],
        bundle: true,
        outfile: outfile,
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
                    build.onEnd((result) =>
                        console.log(
                            result.errors.length > 0
                                ? chalk.red(
                                      `Build ended with ${result.errors.length} errors`
                                  )
                                : chalk.green('Build completed successfully!')
                        )
                    )
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
