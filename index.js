const { createApp } = Vue

createApp({
    data() {
        return {
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            avatar: 'https://i.pravatar.cc/300',
            user: {
                name: {
                    label: 'name',
                    value: 'Test name',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
                },
                email: {
                    label: 'email',
                    value: 'email@gmail.com',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
                },
                city: {
                    label: 'city',
                    value: 'Da Nang',
                    type: 'select',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
                },
                major: {
                    label: 'Major',
                    value: ['IT'],
                    type: 'checkbox'
                },
                gender: {
                    label: 'Gender',
                    value: 'Male',
                    type: 'radio'
                },
            },
            cities: [
                'Da Nang',
                'HCM',
                'HN'
            ],
            majors: [
                'IT',
                'DS',
                'MO'
            ],
            gender: [
                'Male',
                'Female',
                'Apache Helikopter'
            ]
        }
    },
    methods: {
        isValid(type) {
            switch (type) {
                case 'name':
                    return !this.isNameValid()
                case 'email':
                    return !this.isEmailValid()
                default:
                    return false
            }
        },
        isNameValid() {
            return this.user.name.value
        },
        isEmailValid() {
            return (this.user.email.value && this.reg.test(this.user.email.value))
        },
        openFileInput() {
            document.querySelector('input#file').click()
        },
        submit() {
            if (!(this.isEmailValid() && this.isNameValid())) return;
            const body = {
                name: this.user.name.value,
                email: this.user.email.value
            }
            alert(JSON.stringify(body))
        }
    }
}).mount("#app");
