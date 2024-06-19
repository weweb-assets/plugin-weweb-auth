<template>
    <wwEditorFormRow label="Invitation email">
        <div class="weweb-auth-settings-summary__invitation ww-typo-sub-text mb-2">
            {{ emailInvitationSubject }}
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Verification code email">
        <div class="weweb-auth-settings-summary__invitation ww-typo-sub-text mb-2">
            {{ emailVerificationSubject }}
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    computed: {
        emailInvitationSubject() {
            return this.settings.publicData.invitationEmail.EmailSubject;
        },
        emailVerificationSubject() {
            return this.settings.publicData.verificationEmail.EmailSubject;
        },
    },
};
</script>

<style lang="scss" scoped>
.weweb-auth-settings-summary {
    &__invitation {
        padding: var(--ww-spacing-01) var(--ww-spacing-02);
        border: 1px solid var(--ww-color-bg-tertiary);
        background-color: var(--ww-color-bg-tertiary);
        border-radius: var(--ww-border-radius-02);
    }
}
</style>
