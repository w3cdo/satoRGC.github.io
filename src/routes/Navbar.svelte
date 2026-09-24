<script lang="ts">
    import logo from "#lib/assets/logo.svg?raw"
    import wordmark from "#lib/assets/wordmark.svg?raw"
</script>
<style lang="scss">
    nav {
        border-bottom: 1px solid var(--COLOR-SUBTEXT);
        display: flex;
        align-items: stretch;
        flex-direction: row;
    }
    .homepage {
        padding: .75em 1em;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        gap: .5em;
        align-items: center;
        :global(svg) {
            &[data-name="logo"] {
                height: 1.5em;
            }
            &[data-name="wordmark"] {
                height: 1em;
            }
        }
    }
</style>
<nav>
    <a href="/" class="homepage" aria-label="satoRGC">
        <!-- eslint-disable-next-line -->
        {@html logo}
        <!-- eslint-disable-next-line -->
        {@html wordmark}
    </a>
</nav>