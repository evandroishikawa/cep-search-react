import { INPUT_ELEMENTS } from '@/constants';

export function resetFormData(collection: HTMLCollection) {
  const formData = {};

  for (let i = 0; i < collection.length; i++) {
    const child = collection[i];

    if (child.tagName === 'svg') break;

    if (INPUT_ELEMENTS.includes(child.tagName)) {
      (child as HTMLInputElement).value = '';
    } else {
      resetFormData(child.children);
    }
  }

  return formData;
}
