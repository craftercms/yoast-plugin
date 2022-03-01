import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// TODO
export interface AdvancedFormProps {
  seoModel: any;
  handleChange: any;
  updateField: any;
}

export default function AdvancedForm(props: AdvancedFormProps) {
  const { seoModel, handleChange, updateField } = props;

  const onChange = (event, fieldId) => {
    handleChange(event, fieldId);
    updateField(event, fieldId);
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={seoModel.showInSearchResults_b ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'showInSearchResults_b')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Show In Search Results"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={seoModel.followLinks_b ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'followLinks_b')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Follow Links"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={seoModel.indexImages_b ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'indexImages_b')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Index Images"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={seoModel.archive_b ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'archive_b')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Archive"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={seoModel.snippet_b ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'snippet_b')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Snippet"
      />
    </>
  );
}
