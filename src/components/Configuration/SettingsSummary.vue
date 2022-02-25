<template>
    <div class="auth-token-settings-summary">
        <wwEditorFormRow label="Type">
            <div class="auth-token-settings-summary__elem">
                <div><wwEditorIcon large name="auth" class="auth-token-settings-summary__icon" /></div>
                <span class="auth-token-settings-summary__value caption-m">{{ settings.publicData.type }}</span>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="User endpoint">
            <div class="auth-token-settings-summary__elem">
                <div><wwEditorIcon large name="link" class="auth-token-settings-summary__icon" /></div>
                <span class="auth-token-settings-summary__value caption-m">{{ settings.publicData.userEndpoint }}</span>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow v-if="settings.publicData.refreshTokenEndpoint" label="Refresh token endpoint">
            <div class="auth-token-settings-summary__elem">
                <div><wwEditorIcon large name="link" class="auth-token-settings-summary__icon" /></div>
                <span class="auth-token-settings-summary__value caption-m">
                    {{ settings.publicData.refreshTokenEndpoint }}
                </span>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.auth-token-settings-summary {
    &__elem {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: var(--ww-spacing-02);
        }
    }
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
    &__value {
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
