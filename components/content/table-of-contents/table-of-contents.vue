<script lang="ts">
// @ts-expect-error - Vue 3 Treeview has no types
import Tree from 'vue3-treeview'

import { ToCFlatNode } from '@/@types/ToCNode'
import { flatToCtoTree } from '@/helpers/nestedTocToFlat'

// @ts-expect-error - TS doesn't know about CSS modules
import style from './table-of-contents.module.css'

interface TableOfContentsData {
  nodes: { [key: string]: ToCFlatNode }
  config: {
    roots: string[]
    keyboardNavigation: boolean
    editable: boolean
  }
}

export default {
  name: 'TableOfContents',
  components: {
    Tree
  },
  setup() {
    const {
      toc: { value }
    } = useContent()

    if (!value) return {}

    return {
      links: value.links
    }
  },
  data: (): TableOfContentsData => ({
    nodes: {},
    config: {
      roots: [],
      keyboardNavigation: true,
      editable: false
    }
  }),
  computed: {
    classes() {
      return style
    }
  },
  mounted() {
    this.$data.nodes = flatToCtoTree(this.links)
    this.$data.config.roots = Object.values(this.$data.nodes)
      .filter((node) => node.parent === null)
      .map((node) => node.id)

    return {
      config: {
        roots: ['id1', 'id2']
      },
      nodes: {
        id1: {
          text: 'text1',
          children: ['id11', 'id12']
        },
        id11: {
          text: 'text11'
        },
        id12: {
          text: 'text12'
        },
        id2: {
          text: 'text2'
        }
      }
    }
  },
  methods: {
    onNodeClick(node: ToCFlatNode | null) {
      if (!node) return

      const element = document.querySelector(`[href="#${node.id}"]`)

      if (!element) return

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<template>
  <div :class="classes['table-of-contents']">
    <span class="text-sm text-zinc-500">Spis treści</span>

    <tree :nodes="nodes" :config="config" @node-focus="onNodeClick" />
  </div>
</template>
