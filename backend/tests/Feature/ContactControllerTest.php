<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test api can store new contacts.
     *
     * @return void
     */
    public function test_api_can_store_contacts()
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->makeOne([
            'user_id' => $user->id,
        ]);

        $this
            ->actingAs($user, 'api')
            ->post(route('contacts.store'), $contact->getAttributes());

        $this->assertDatabaseCount('contacts', 1);

        $this->assertDatabaseHas('contacts', [
            'name' => $contact->name,
            'description' => $contact->description,
            'phone_number' => $contact->phone_number,
        ]);
    }

    /**
     * Test api can show specific contact only to its owner.
     *
     * @return void
     */
    public function test_only_owner_can_see_his_contacts()
    {
        [$owner, $notOwner] = User::factory(2)->create();

        $contact = Contact::factory()->createOne([
            'user_id' => $owner->id,
        ]);

        $this->assertDatabaseCount('contacts', 1);

        $response = $this
            ->actingAs($notOwner, 'api')
            ->get(route('contacts.show', $contact->id));

        $response->assertNotFound();

        $response = $this
            ->actingAs($owner, 'api')
            ->get(route('contacts.show', $contact->id));

        $response->assertJson([
            "id" => $contact->id,
            "name" => $contact->name,
            "description" => $contact->description,
            "phone_number" => $contact->phone_number,
        ]);
    }

    /**
     * Test api can update specific contact only if request belongs to owner.
     *
     * @return void
     */
    public function test_only_owner_can_update_his_contacts()
    {
        [$owner, $notOwner] = User::factory(2)->create();

        $contact = Contact::factory()->createOne([
            'user_id' => $owner->id,
        ]);

        $this->assertDatabaseCount('contacts', 1);

        $response = $this
            ->actingAs($notOwner, 'api')
            ->put(route('contacts.update', $contact->id), [
                "name" => "Name 1",
                "description" => "Description 1",
                "phone_number" => "123456789",
            ]);

        $response->assertNotFound();

        $response = $this
            ->actingAs($owner, 'api')
            ->put(route('contacts.update', $contact->id), [
                "name" => "Name 1",
                "description" => "Description 1",
                "phone_number" => "123456789",
            ]);

        $this->assertDatabaseCount('contacts', 1);

        $this->assertDatabaseHas('contacts', [
            "id" => $contact->id,
            "name" => "Name 1",
            "description" => "Description 1",
            "phone_number" => "123456789",
        ]);
    }

    /**
     * Test api can delete specific contact only if request belongs to owner.
     *
     * @return void
     */
    public function test_only_owner_can_delete_his_contacts()
    {
        [$owner, $notOwner] = User::factory(2)->create();

        $contact = Contact::factory()->createOne([
            'user_id' => $owner->id,
        ]);

        $this->assertDatabaseCount('contacts', 1);

        $response = $this
            ->actingAs($notOwner, 'api')
            ->delete(
                route('contacts.destroy', $contact->id),
                $contact->getAttributes()
            );

        $response->assertNotFound();

        $this->assertDatabaseCount('contacts', 1);

        $response = $this
            ->actingAs($owner, 'api')
            ->delete(
                route('contacts.destroy', $contact->id),
                $contact->getAttributes()
            );

        $this->assertDatabaseCount('contacts', 0);
    }
}
