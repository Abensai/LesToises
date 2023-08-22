<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/calculate-score", name="calculate_score", methods={"POST"})
     */
    public function calculateScore(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $score = $data['q1'] + $data['q2'];

        $response = [
            'score' => $score,
            'message' => $score >= 5 ? 'Please make an appointment with your doctor' : 'You have no worrying signs',
        ];

        return $this->json($response);
    }
}
