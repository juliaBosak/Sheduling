<template>
	<transition name="modal">
		<div class="overlay">
			<div class="popup">
					<button @click="$emit('close')" class="close"></button>
				<div class="mx-3">
					<h2 class="my-4">Уппс... Сталася помилка.
						Спробуйте ще раз</h2>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'popup-error',
	}
</script>
