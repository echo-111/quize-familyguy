/**
 * Retrieves a character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import qoutes from '@/data/qoutes.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const character = characters.data.find(item => item.slug === params.slug);

    if (!character) {
      return new NextResponse('not found', { status: 404 })
    };
    const character_qouters = qoutes.data.filter(
      item => item.character_id === character.id,
    )

    return NextResponse.json({
      character,
      character_qouters: character_qouters.length > 0 ? character_qouters : null,
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}