<template>
	<div v-if="editor" class="container border border-dark rounded shadow p-4">
		<div id="control-group" class="mb-4">
			<div class="button-group">
				<button
					v-for="button in buttons"
					:key="button.name"
					:disabled="button.isDisabled ? !editor.can().chain().focus()[button.name]().run() : false"
					:class="{ 'is-active': button.isActive ? editor.isActive(button.name, button.attrs) : false }"
					@click="button.action"
				>
					<component :is="button.icon" class="w-4 h-4" />
					<!-- {{ button.label }} -->
				</button>
			</div>
		</div>
		<editor-content :editor="editor" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Code, Quote, Minus, Pilcrow } from 'lucide-vue-next'
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

const props = defineProps<{
  content: string
  onUpdate:(content: string) => void
  editable: boolean
}>()

const defaultContent = '<p>Custom Board Instruction</p>'

const editor = useEditor({
  content: props.content || defaultContent,
  editable: props.editable,
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    StarterKit

  ],
  onUpdate: ({ editor }) => {
    props.onUpdate(editor.getHTML())
  }
})

watch(() => props.editable, (editable) => {
  console.log('editable', editable)
  editor.value?.setEditable(editable)
}, { immediate: true })
const buttons = ref([
  { name: 'toggleBold', label: 'Bold', icon: Bold, action: () => editor.value?.chain().focus().toggleBold().run(), isDisabled: true, isActive: true },
  { name: 'toggleItalic', label: 'Italic', icon: Italic, action: () => editor.value?.chain().focus().toggleItalic().run(), isDisabled: true, isActive: true },
  { name: 'toggleStrike', label: 'Strike', icon: Strikethrough, action: () => editor.value?.chain().focus().toggleStrike().run(), isDisabled: true, isActive: true },
  { name: 'setParagraph', label: 'Paragraph', icon: Pilcrow, action: () => editor.value?.chain().focus().setParagraph().run(), isActive: true },
  { name: 'toggleHeading', label: 'H1', icon: Heading1, action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: true, attrs: { level: 1 } },
  { name: 'toggleHeading', label: 'H2', icon: Heading2, action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: true, attrs: { level: 2 } },
  { name: 'toggleHeading', label: 'H3', icon: Heading3, action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: true, attrs: { level: 3 } },
  { name: 'toggleBulletList', label: 'Bullet list', icon: List, action: () => editor.value?.chain().focus().toggleBulletList().run(), isActive: true },
  { name: 'toggleOrderedList', label: 'Ordered list', icon: ListOrdered, action: () => editor.value?.chain().focus().toggleOrderedList().run(), isActive: true },
  { name: 'toggleCodeBlock', label: 'Code block', icon: Code, action: () => editor.value?.chain().focus().toggleCodeBlock().run(), isActive: true },
  { name: 'toggleBlockquote', label: 'Blockquote', icon: Quote, action: () => editor.value?.chain().focus().toggleBlockquote().run(), isActive: true },
  { name: 'setHorizontalRule', label: 'Horizontal rule', icon: Minus, action: () => editor.value?.chain().focus().setHorizontalRule().run() }
])

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss">
.ProseMirror{
    @apply   text-dark  rounded  p-4 outline-none;

}
.button-group{
    @apply flex flex-row gap-2 flex-wrap;
    button{
        @apply bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow hover:bg-gray-300 flex items-center;
    }
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    list-style: revert;
    color: var(--dark);
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--dark);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border-top: 1px solid var(--dark);
    margin: 2rem 0;
  }
}

.floating-menu {
  @apply flex flex-row gap-2 bg-white p-2 rounded shadow;
  button {
    @apply bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow hover:bg-gray-300 flex items-center;
    &.is-active {
      @apply bg-primary text-white;
    }
  }
}
</style>
