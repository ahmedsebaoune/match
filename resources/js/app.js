import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import AppLayout from "./layouts/AppLayout"

createInertiaApp({
  resolve: name => {
      const page = require(`./Pages/${name}`).default
      page.layout ??= page => <AppLayout>{page}</AppLayout>;
      return page;
  },
  setup({ el, App, props }) {
    render(<App {...props} />, el)
  },
})
