import React, {
  useState,
  useEffect
} from 'react';

import {
  getAuthToken,
  fetchNotifications
} from '../utils/api';

import {
  getPriorityInbox
} from '../utils/prioritySorter';

import {

  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  Alert

} from '@mui/material';

export default function PriorityInbox() {

  const [token, setToken] = useState('');

  const [allNotifications,
    setAllNotifications] = useState([]);

  const [viewedIds,
    setViewedIds] = useState(new Set());

  const [limit, setLimit] = useState(10);

  const [filterType,
    setFilterType] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {

    getAuthToken()

      .then(setToken)

      .catch(err =>
        setError(
          'Auth failed: ' + err.message
        )
      );

  }, []);

  useEffect(() => {

    if (!token) return;

    fetchNotifications(
      token,
      50,
      1,
      filterType
    )

      .then(setAllNotifications)

      .catch(err =>
        setError(
          'Fetch failed: ' + err.message
        )
      );

  }, [token, filterType]);

  const unreadNotifications =
    allNotifications.filter(
      n => !viewedIds.has(n.ID)
    );

  const viewedNotifications =
    allNotifications.filter(
      n => viewedIds.has(n.ID)
    );

  const priorityInboxItems =
    getPriorityInbox(
      unreadNotifications,
      limit
    );

  const markAsRead = (id) => {

    setViewedIds(
      prev => new Set([...prev, id])
    );

  };

  return (

    <Container
      maxWidth="md"
      style={{
        marginTop: '24px',
        marginBottom: '24px'
      }}
    >

      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
      >

        Campus Priority Inbox

      </Typography>

      {error && (

        <Alert
          severity="error"
          style={{
            marginBottom: '16px'
          }}
        >

          {error}

        </Alert>

      )}

      <Box
        display="flex"
        gap={2}
        mb={4}
        justifyContent="center"
      >

        <FormControl
          style={{ minWidth: 150 }}
        >

          <InputLabel>
            Show Top (n)
          </InputLabel>

          <Select
            value={limit}
            label="Show Top (n)"
            onChange={(e) =>
              setLimit(e.target.value)
            }
          >

            <MenuItem value={10}>
              Top 10
            </MenuItem>

            <MenuItem value={15}>
              Top 15
            </MenuItem>

            <MenuItem value={20}>
              Top 20
            </MenuItem>

          </Select>

        </FormControl>

        <FormControl
          style={{ minWidth: 150 }}
        >

          <InputLabel>
            Filter Type
          </InputLabel>

          <Select
            value={filterType}
            label="Filter Type"
            onChange={(e) =>
              setFilterType(e.target.value)
            }
          >

            <MenuItem value="">
              All Types
            </MenuItem>

            <MenuItem value="Placement">
              Placements Only
            </MenuItem>

            <MenuItem value="Result">
              Results Only
            </MenuItem>

            <MenuItem value="Event">
              Events Only
            </MenuItem>

          </Select>

        </FormControl>

      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12} md={7}>

          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >

            Priority Notifications
            ({priorityInboxItems.length})

          </Typography>

          {priorityInboxItems.length === 0 ? (

            <Typography
              variant="body2"
              color="textSecondary"
            >

              No unread notifications left.

            </Typography>

          ) : (

            priorityInboxItems.map((item) => (

              <Card
                key={item.ID}
                style={{
                  marginBottom: '12px',
                  borderLeft:
                    '5px solid #2196f3'
                }}
              >

                <CardContent>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >

                    <Typography
                      variant="caption"
                      color="secondary"
                      fontWeight="bold"
                    >

                      [{item.Type}]

                    </Typography>

                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >

                      {
                        new Date(
                          item.Timestamp
                        ).toLocaleTimeString()
                      }

                    </Typography>

                  </Box>

                  <Typography variant="body1">

                    {item.Message}

                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    mt={1}
                  >

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        markAsRead(item.ID)
                      }
                    >

                      Mark Read

                    </Button>

                  </Box>

                </CardContent>

              </Card>

            ))

          )}

        </Grid>

        <Grid item xs={12} md={5}>

          <Typography
            variant="h6"
            gutterBottom
            color="textSecondary"
            fontWeight="bold"
          >

            Already Viewed
            ({viewedNotifications.length})

          </Typography>

          {viewedNotifications.map((item) => (

            <Card
              key={item.ID}
              style={{
                marginBottom: '12px',
                opacity: 0.6,
                backgroundColor: '#f5f5f5'
              }}
            >

              <CardContent>

                <Typography
                  variant="caption"
                  display="block"
                >

                  [{item.Type}]

                </Typography>

                <Typography variant="body2">

                  {item.Message}

                </Typography>

              </CardContent>

            </Card>

          ))}

        </Grid>

      </Grid>

    </Container>

  );
}