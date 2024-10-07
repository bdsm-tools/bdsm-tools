import React from 'react';
import { Modal, Rate, Input, Checkbox } from 'antd';
import { useLocalStorageState } from 'ahooks';

export default function ProvideFeedback({
  feedbackPrompt,
  feedbackContext = Math.random(),
  onSendFeedback,
  quickResponses = [],
}) {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const [checkedQuickResponses, setCheckedQuickResponses] = React.useState([]);
  const [rating, setRating] = useLocalStorageState(
    `feedback-${feedbackContext}`,
    { deserializer: Number },
  );

  return (
    <>
      <Rate
        value={rating}
        onChange={(value) => {
          setRating(value);
          setOpen(true);
          setFeedback('');
          setCheckedQuickResponses([]);
        }}
        allowClear={false}
      />
      <Modal
        title='Provide feedback'
        open={open}
        okText='Send feedback'
        cancelText='Just send star rating'
        onOk={() => {
          setOpen(false);
          onSendFeedback({
            rating,
            feedback:
              checkedQuickResponses.length > 0
                ? `${feedback}\n${checkedQuickResponses.map((text) => ` - ${text}`).join('\n')}`
                : feedback,
          });
        }}
        onCancel={() => {
          setOpen(false);
          onSendFeedback({
            rating,
          });
        }}
      >
        <Rate value={rating} onChange={setRating} allowClear={false} />

        <Input.TextArea
          rows={4}
          placeholder={feedbackPrompt}
          value={feedback}
          onChange={({ target }) => setFeedback(target.value)}
          style={{ marginTop: 10 }}
        />

        {quickResponses && quickResponses.length > 0 && (
          <Checkbox.Group
            options={quickResponses}
            value={checkedQuickResponses}
            onChange={setCheckedQuickResponses}
            style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}
          />
        )}
      </Modal>
    </>
  );
}
