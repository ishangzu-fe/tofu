/**
 * unlink
 * Created by peak on 16/8/18.
 */
export default{
    name: "unlink",
    icon: "custom-icon unlink",
    show: true,
    i18n: "unlink",
    handler (editor) {
        editor.execCommand("unlink")
    }
}