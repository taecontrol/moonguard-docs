---
id: user-model
slug: /user-model
sidebar_position: 1
---

# User model
Larastats ships with a _**standard-basic**_ user model, It's not mandatory to use our model, it's most likely that you use the user model of your project.

## Custom User Model

The following steps must be completed to use a custom User model:

1. Your **User** class must extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\Larastats\Contracts\LarastatsUser` interface.
2. Your **User** class must declare `use Notifiable`.
3. Implement all the properties and methods required, you can guide yourself with the original `User.php` model from Larastats.
3. Replace the new User model class in the configuration file.