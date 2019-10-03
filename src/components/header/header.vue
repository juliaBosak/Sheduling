<template>
  <nav class="row" v-bind:class="classObjectNav">
		<a class="col-2" v-bind:class="classObjectLink"  v-bind:href="url">{{title}}</a>
	</nav>
</template>
<script>
export default {
    name: 'headerApp',
    props: {
        url: String,
        title: String
    },
	data: function () {
    return {
      classObjectNav: {
			navbar: true,
				'navbar-dark': true,
				'bg-primary': true,
			},
			classObjectLink: {
				'navbar-brand': true,
				'mr-0': true
			}
    }
		
    }
}
</script>
