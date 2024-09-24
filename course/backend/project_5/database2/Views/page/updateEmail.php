
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h2 class="text-center mb-4">Update Email Address</h2>
            <form action="/form/verify/resend" method="post">
                <input type="hidden" name="csrf_token" value="<?= Helpers\CrossSiteForgeryProtection::getToken(); ?>">
                <div class="mb-3">
                    <label for="email" class="form-label">Please enter your email address</label>
                    <input type="email" class="form-control" id="email" name="email" >
                </div>
                <p class="small">&#x203B; To resend the signed URL, simply click the button without entering your email address.</p>
                <button type="submit" class="btn btn-primary">Resend Email</button>
            </form>
        </div>
    </div>
</div>