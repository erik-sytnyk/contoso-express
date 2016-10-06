const PaginationButton = require('./paginationButton.vue');

export default {
    props: {
        items: {
            type: Number,
            default: 1
        },
        activePage: {
            type: Number,
            default: 1
        },
        maxButtons: {
            type: Number,
            default: 0
        },
        /**
         * When `true`, will display the first and the last button page
         */
        boundaryLinks: {
            type: Boolean,
            default: false
        },
        /**
         * When `true`, will display the default node value ('&hellip;').
         * Otherwise, will display provided string value (when specified).
         * */
        ellipsis: {
            type: [Boolean, String],
            default: false
        },
        /**
         * When `true`, will display the default node value ('&laquo;').
         * Otherwise, will display provided string value (when specified).
         */
        first: {
            type: [Boolean, String],
            default: false
        },
        /**
         * When `true`, will display the default node value ('&raquo;').
         * Otherwise, will display provided string value (when specified).
         */
        last: {
            type: [Boolean, String],
            default: false
        },
        /**
         * When `true`, will display the default node value ('&lsaquo;').
         * Otherwise, will display provided string value (when specified).
         */
        prev: {
            type: [Boolean, String],
            default: false
        },
        /**
         * When `true`, will display the default node value ('&rsaquo;').
         * Otherwise, will display provided string value (when specified).
         */
        next: {
            type: [Boolean, String],
            default: false
        },
        pageSelect: {
            type: Function
        },
        bsClass: {
            type: String,
            default: 'pagination'
        },
        bsSize: {
            type: String
        }
    },
    components: {PaginationButton},
    computed: {
        pageLimits() {
            let pageButtons = [];
            let startPage, endPage, hasHiddenPagesAfter;

            let {
                maxButtons,
                activePage,
                items
            } = this;

            if (maxButtons) {
                let hiddenPagesBefore = activePage - parseInt((maxButtons / 2).toString(), 10);
                startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
                hasHiddenPagesAfter = startPage + maxButtons <= items;

                if (!hasHiddenPagesAfter) {
                    endPage = items;
                    startPage = items - maxButtons + 1;
                    if (startPage < 1) {
                        startPage = 1;
                    }
                } else {
                    endPage = startPage + maxButtons - 1;
                }
            } else {
                startPage = 1;
                endPage = items;
            }

            return {
                startPage,
                endPage,
                hasHiddenPagesAfter
            };
        },
        pageLabels() {
            let result = [];
            let limits = this.pageLimits;

            for (let pagenumber = limits.startPage; pagenumber <= limits.endPage; pagenumber++) {
                result.push(pagenumber);
            }

            return result;
        },
        showHiddenPagesBefore() {
            let limits = this.pageLimits;
            return this.boundaryLinks && this.ellipsis && limits.startPage !== 1;
        },
        showHiddenPagesAfter() {
            let limits = this.pageLimits;
            return this.maxButtons && limits.hasHiddenPagesAfter && this.ellipsis;
        },
        showExtraLastPage() {
            let limits = this.pageLimits;
            return this.showHiddenPagesAfter && this.boundaryLinks && limits.endPage !== this.items;
        },
        sizeClass() {
            if (!this.bsSize) return '';

            return 'pagination-' + this.bsSize;
        }
    }
};