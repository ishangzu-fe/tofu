/**
 * undo
 * Created by peak on 16/8/20.
 */
export default {
    name: "undo",
    icon: "custom-icon undo",
    show: true,
    i18n: "undo",
    handler (editor) {
        editor.execCommand("undo")
    },
}

