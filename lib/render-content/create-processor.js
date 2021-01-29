const unified = require('unified')
const markdown = require('remark-parse')
const emoji = require('remark-gemoji-to-emoji')
const remark2rehype = require('remark-rehype')
const raw = require('rehype-raw')
const slug = require('rehype-slug')
const autolinkHeadings = require('rehype-autolink-headings')
const highlight = require('rehype-highlight')
const html = require('rehype-stringify')
const graphql = require('highlightjs-graphql').definer
const remarkCodeExtra = require('remark-code-extra')
const codeHeader = require('./plugins/code-header')

module.exports = function createProcessor () {
  return unified()
    .use(markdown)
    .use(remarkCodeExtra, { transform: codeHeader })
    .use(emoji)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(slug)
    .use(autolinkHeadings, { behavior: 'wrap' })
    .use(highlight, { languages: { graphql }, subset: false })
    .use(raw)
    .use(html)
}