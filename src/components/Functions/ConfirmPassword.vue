<template>
    <wwEditorInputRow
        label="Verification Code"
        type="query"
        :model-value="verificationCode"
        bindable
        required
        placeholder="Enter the verification code"
        @update:modelValue="setVerificationCode"
    />
    <wwEditorInputRow
        label="New Password"
        type="query"
        :model-value="newPassword"
        bindable
        required
        placeholder="Enter the new password"
        @update:modelValue="setNewPassword"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    computed: {
        verificationCode() {
            return this.args.verificationCode;
        },
        newPassword() {
            return this.args.newPassword;
        },
    },
    methods: {
        setVerificationCode(verificationCode) {
            this.$emit('update:args', { ...this.args, verificationCode });
        },
        setNewPassword(newPassword) {
            this.$emit('update:args', { ...this.args, newPassword });
        },
    },
};
</script>
