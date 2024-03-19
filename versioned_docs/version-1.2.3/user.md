---
id: create-a-custom-user-model
slug: /create-a-custom-user-model
sidebar_position: 12
---

# Create a custom user model

Moonguard comes with its own user model (it has a default structure with some
modifications), but you will most likely want to use your project's user model.
If that's the case, the next section will help you make the necessary changes
to the Moonguard configuration.

Follow the next steps to adapt your own `User` model to use MoonGuard features:

1. Create a `User` class must extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardUser` contract.
2. The `User` class must declare `use Notifiable`.
3. The `User` class have to implement all the properties and methods required, you can guide yourself with the original `User.php` model from Moonguard.
4. Replace the new `User` model class in the configuration file.
