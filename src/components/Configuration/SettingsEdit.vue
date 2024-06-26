<template>
    <wwEditorFormRow label="Invitation email">
        <div class="weweb-auth-settings-edit__invitation ww-typo-sub-text mb-2">
            {{ emailInvitationSubject }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="weweb-auth-settings-edit__invitation ww-typo-caption mb-1" v-html="emailInvitationMessage"></div>
        <div class="ww-typo-link mb-2 weweb-auth-settings-edit__description">
            If you want to change the invitation email template
            <a class="ww-editor-link" href="https://support.weweb.io/ticket/new/" target="_blank">contact us</a>.
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Verification code email">
        <div class="weweb-auth-settings-edit__invitation ww-typo-sub-text mb-2">
            {{ emailVerificationSubject }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="weweb-auth-settings-edit__invitation ww-typo-caption mb-1" v-html="emailVerificationMessage"></div>
        <div class="ww-typo-link mb-2 weweb-auth-settings-edit__description">
            If you want to change the verification code email template
            <a class="ww-editor-link" href="https://support.weweb.io/ticket/new/" target="_blank">contact us</a>.
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
        emailInvitationMessage() {
            return this.settings.publicData.invitationEmail.EmailMessage.replace('{username}', '{email}').replace(
                '{####}',
                '{password}'
            );
        },
        emailVerificationSubject() {
            return this.settings.publicData.verificationEmail.EmailSubject;
        },
        emailVerificationMessage() {
            return this.settings.publicData.verificationEmail.EmailMessage.replace('{####}', '{code}');
        },
    },
};
</script>

<style lang="scss" scoped>
.weweb-auth-settings-edit {
    &__description {
        color: var(--ww-color-theme-dark-600);
    }
    &__invitation {
        padding: var(--ww-spacing-01) var(--ww-spacing-02);
        border: 1px solid var(--ww-color-bg-tertiary);
        background-color: var(--ww-color-bg-tertiary);
        border-radius: var(--ww-border-radius-02);
    }
}
</style>
