<template>
    <wwEditorFormRow label="Invitation email">
        <div class="weweb-auth-settings-edit__invitation ww-typo-sub-text mb-2">
            {{ emailInvitationSubject }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="weweb-auth-settings-edit__invitation ww-typo-caption mb-1" v-html="emailInvitationMessage"></div>
        <div class="ww-typo-link mb-2 weweb-auth-settings-edit__description">
            If you want to change the invitation email template
            <span class="ww-editor-link" @click="contactUs">contact us</span>.
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
            <span class="ww-editor-link" @click="contactUs">contact us</span>.
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
    methods: {
        async contactUs() {
            if (!window.userflow) {
                return await wwLib.wwModals.open({
                    title: { en: 'Uh oh 😢' },
                    text: "Please disable your adblocker. We won't share your data with third-party ad services.",
                    buttons: [{ text: 'I understand', color: '-primary', value: true, enter: true }],
                });
            }
            window.userflow.start('85312edc-c9f8-4524-bb40-51c389688025')
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
        border: 1px solid var(--ww-color-theme-dark-100);
        background-color: var(--ww-color-theme-dark-50);
        border-radius: var(--ww-border-radius-02);
    }
}
</style>
