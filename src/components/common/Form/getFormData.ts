import { INPUT_ELEMENTS } from '@/constants';

export function getFormData(collection: HTMLCollection) {
  const formData = {};

  for (let i = 0; i < collection.length; i++) {
    const child = collection[i];

    if (child.tagName === 'svg') break;

    if (INPUT_ELEMENTS.includes(child.tagName)) {
      const { name, value } = child as HTMLInputElement;

      Object.assign(formData, { [name]: value });
    } else if (child.className.includes('InputComponent')) {
      const data = getFormData(child.children);

      Object.assign(formData, data);
    } else {
      const data = getFormData(child.children);

      Object.assign(formData, data);
    }
  }

  return formData;
}
