<template>
    <wwEditorInputRow
        label="Old Password"
        type="query"
        :model-value="oldPassword"
        bindable
        required
        placeholder="Enter the old password"
        @update:modelValue="setOldPassword"
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
        args: { type: Array, default: () => [null, null] },
    },
    emits: ['update:args'],
    computed: {
        oldPassword() {
            return this.args[0];
        },
        newPassword() {
            return this.args[1];
        },
    },
    methods: {
        setOldPassword(oldPassword) {
            this.$emit('update:args', [oldPassword, this.newPassword]);
        },
        setNewPassword(newPassword) {
            this.$emit('update:args', [this.oldPassword, newPassword]);
        },
    },
};
</script>
