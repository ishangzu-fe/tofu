import { $t } from '../utils/locale';

export default {
    methods: {
        $t(...args) {
            return $t.apply(this, args);
        }
    }
};
