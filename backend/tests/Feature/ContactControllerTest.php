<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

        $contact = Contact::factory()->makeOne();

        $this
            ->actingAs($user)
            ->post(route('contacts.store'), $contact->getAttributes());

        $this->assertDatabaseCount('contacts', 1);

        $this->assertDatabaseHas('contacts', [
            'name' => $contact->name,
            'description' => $contact->description,
            'phone_number' => $contact->phone_number,
        ]);
    }

    /**
     * Test api can show specific contact.
     *
     * @return void
     */
    public function test_api_can_return_contact()
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->createOne();

        $this->assertDatabaseCount('contacts', 1);

        $response = $this
            ->actingAs($user)
            ->get(route('contacts.show', $contact->id));

        $response->assertJson([
            "id" => $contact->id,
            "name" => $contact->name,
            "description" => $contact->description,
            "phone_number" => $contact->phone_number,
        ]);
    }

    /**
     * Test api can update specific contact.
     *
     * @return void
     */
    public function test_api_can_update_contacts()
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->createOne();

        $this->assertDatabaseCount('contacts', 1);

        $this
            ->actingAs($user)
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
     * Test api can delete specific contact.
     *
     * @return void
     */
    public function test_api_can_delete_contacts()
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->createOne();

        $this->assertDatabaseCount('contacts', 1);

        $this
            ->actingAs($user)
            ->delete(
                route('contacts.destroy', $contact->id),
                $contact->getAttributes()
            );

        $this->assertDatabaseCount('contacts', 0);
    }
}
