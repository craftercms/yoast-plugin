import React from 'react';
import TextField from "@mui/material/TextField";

// TODO
export interface SeoFormProps {
  seoModel: any;
  handleChange: any;
  updateField: any;
}

export default function SeoForm(props: SeoFormProps) {
  const { seoModel, handleChange, updateField } = props;

  return (
    <>
      <TextField
        fullWidth
        label="SEO Title"
        value={seoModel.seoTitle_s ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'seoTitle_s')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          updateField(e, 'seoTitle_s')
        }}
      />

      <TextField
        fullWidth
        label="Meta Description"
        multiline
        rows={4}
        value={seoModel.metaDescription_t ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'metaDescription_t')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          updateField(e, 'metaDescription_t')
        }}
      />

      <TextField
        fullWidth
        label="Focus Keyphrase"
        value={seoModel.focusKeyphrase_s ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'focusKeyphrase_s')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          updateField(e, 'focusKeyphrase_s')
        }}
      />
    </>
  );
}
