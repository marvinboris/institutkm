<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Preregistration extends Notification
{
    use Queueable;

    private $preregistration;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($preregistration)
    {
        $this->preregistration = $preregistration;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Nouvelle préinscription!')
            ->line('Formation: ' .  $this->preregistration['training']['title'] . ' (' . $this->preregistration['training']['category'] . ', ' . $this->preregistration['training']['level'] . ')')
            ->line('Nom complet: ' .  $this->preregistration['last_name'] . ' ' . $this->preregistration['first_name'])
            ->line('Date de naissance: ' .  $this->preregistration['birthdate'])
            ->line('Genre: ' .  $this->preregistration['gender'])
            ->line('Adresse: ' .  $this->preregistration['address'])
            ->line('Numéro de téléphone: ' .  $this->preregistration['phone'])
            ->line('Pays: ' .  $this->preregistration['country'])
            ->line('Ville: ' .  $this->preregistration['city'])
            ->line('Niveau d\'études: ' .  $this->preregistration['level'])
            ->line('Activité: ' .  $this->preregistration['activity'])
            ->line('Merci d\'utiliser notre application !');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
