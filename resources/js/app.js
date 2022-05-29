import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import AppLayout from "./layouts/AppLayout"
import {InertiaProgress} from '@inertiajs/progress'

InertiaProgress.init()
//
// createInertiaApp({
//   resolve: name => {
//       const page = require(`./Pages/${name}`).default
//       page.layout = page.layout || AppLayout
//       return page;
//   },
//   setup({ el, App, props }) {
//     render(<App {...props} />, el)
//   },
// })
createInertiaApp({
    resolve: name => {
        const page = require(`./Pages/${name}`).default
        console.log(page.layout)
        page.layout = page.layout || AppLayout
        return page
    },
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})
