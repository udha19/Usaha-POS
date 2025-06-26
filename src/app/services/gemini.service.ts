import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: environment.GEMINI_KEY });

  constructor() {}

  async generateItem(name: string, cat?: string) {
    const category = cat ? cat : 'produk';
    const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents:
        'buatkan list dari ' +
        category +
        'bernama' +
        name +
        ' jawab hanya berisi format nama, harga dalam rupiah tapi berformat number dan deskripsi yang menarik dalam bahasa Indonesia',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
              },
              description: {
                type: Type.STRING,
              },
              price: {
                type: Type.NUMBER,
              },
            },
            propertyOrdering: ['name', 'price', 'description'],
          },
        },
      },
    });

    return response.candidates[0].content.parts[0].text;
  }
}
