/**
 * remove format of selection
 * Created by peak on 16/8/18.
 */
export default {
    name: "eraser",
    icon: "custom-icon eraser",
    i18n: "eraser",
    show: true,
    handler (editor) {
        editor.execCommand("removeFormat")
    }
}
