<script lang="ts">
  import {spring} from 'svelte/motion';
  import {createEventDispatcher} from "svelte";

  export let count = 0;
  let dispatch = createEventDispatcher();

  const displayed_count = spring();
  $: displayed_count.set(count);
  $: offset = modulo($displayed_count, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }

  $: {
    dispatch("onChangeCount", count)
  }

</script>

<div class="counter">
    <button aria-label="Decrease the counter by one" on:click={() => (count -= 1)}>
        <svg aria-hidden="true" viewBox="0 0 1 1">
            <path d="M0,0.5 L1,0.5"/>
        </svg>
    </button>

    <div class="counter-viewport">
        <div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
            <strong aria-hidden="true" class="hidden">{Math.floor($displayed_count + 1)}</strong>
            <strong>{Math.floor($displayed_count)}</strong>
        </div>
    </div>

    <button aria-label="Increase the counter by one" on:click={() => (count += 1)}>
        <svg aria-hidden="true" viewBox="0 0 1 1">
            <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"/>
        </svg>
    </button>
</div>

<style>
	.counter {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		margin: 1rem 0;
	}

	.counter button {
		align-items: center;
		background-color: transparent;
		border: 0;
		color: var(--text-color);
		display: flex;
		font-size: 2rem;
		justify-content: center;
		padding: 0;
		width: 2em;
	}

	.counter button:hover {
		background-color: var(--secondary-color);
	}

	svg {
		height: 25%;
		width: 25%;
	}

	path {
		stroke: var(--text-color);
		stroke-width: 2px;
		vector-effect: non-scaling-stroke;
	}

	.counter-viewport {
		height: 4em;
		overflow: hidden;
		position: relative;
		text-align: center;
		width: 8em;
	}

	.counter-viewport strong {
		align-items: center;
		color: var(--accent-color);
		display: flex;
		font-size: 4rem;
		font-weight: 400;
		height: 100%;
		justify-content: center;
		position: absolute;
		width: 100%;
	}

	.counter-digits {
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}

	:root {
		--accent-color: #ff3e00;
		--heading-color: rgba(0, 0, 0, 0.7);
		--primary-color: #b9c6d2;
		--secondary-color: #d0dde9;
		--tertiary-color: #edf0f8;
		--text-color: #444444;
		font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
		Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		--column-margin-top: 4rem;
		--font-mono: 'Fira Mono', monospace;
		--pure-white: #ffffff;
		--column-width: 42rem;
		--background-without-opacity: rgba(255, 255, 255, 0.7);
	}

</style>
