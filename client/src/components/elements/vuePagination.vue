<template>
    <div>
        <ul :class="bsClass" :class="sizeClass">
            <!--FIRST-->
            <pagination-button v-if="first" :event-key="1" :page-select="pageSelect"
                               :disabled="activePage === 1">
                <span aria-label="First">
                  {{this.first === true ? '\u00ab' : this.first}}
                </span>
            </pagination-button>

            <!--PREVIOUS-->
            <pagination-button v-if="prev" :event-key="activePage - 1" :page-select="pageSelect"
                               :disabled="activePage === 1">
                <span aria-label="Previous">
                  {{this.prev === true ? '\u2039' : this.prev}}
                </span>
            </pagination-button>

            <!--PAGES-->
            <template v-if="showHiddenPagesBefore">
                <pagination-button :event-key="1" :page-select="pageSelect" :active="false">
                    1
                </pagination-button>

                <pagination-button :disabled="true">
                    <span aria-label="More">
                      {{this.ellipsis === true ? '\u2026' : this.ellipsis}}
                    </span>
                </pagination-button>
            </template>

            <pagination-button v-for="pageLabel in pageLabels"
                               :event-key="pageLabel" :page-select="pageSelect" :active="activePage === pageLabel">
                {{pageLabel}}
            </pagination-button>

            <template v-if="showHiddenPagesAfter">
                <pagination-button :disabled="true">
                <span aria-label="More">
                  {{this.ellipsis === true ? '\u2026' : this.ellipsis}}
                </span>
                </pagination-button>
                <pagination-button v-if="showExtraLastPage" :event-key="items" :page-select="pageSelect"
                                   :active="false">
                    {{items}}
                </pagination-button>
            </template>

            <!--NEXT-->
            <pagination-button v-if="next" :event-key="activePage + 1" :page-select="pageSelect"
                               :disabled="activePage >= items">
                <span aria-label="Next">
                  {{this.next === true ? '\u203a' : this.next}}
                </span>
            </pagination-button>

            <!--LAST-->
            <pagination-button v-if="last" :event-key="items" :page-select="pageSelect"
                               :disabled="activePage >= items">
                <span aria-label="Last">
                  {{this.last === true ? '\u00bb' : this.last}}
                </span>
            </pagination-button>
        </ul>
    </div>
</template>
<style>

</style>
<script src="./vuePagination.vue.js"></script>


