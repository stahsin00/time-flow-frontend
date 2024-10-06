<script>
    export let adviceText;
</script>

<div class="advice-card">
    {adviceText}
</div>

<style>
    .advice-card {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .advice-card:hover {
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 600px) {
        .advice-card {
            padding: 10px;
        }
    }
</style>
