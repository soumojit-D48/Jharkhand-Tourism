

import { useState, useEffect } from 'react';
import { X, UserPlus, Trash2, Users, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { apiService } from '../lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function RoleManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPendingRequests();
      setRequests(response.users || []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, userName, role) => {
    setProcessing(userId);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.approveRole(userId);
      setSuccess(response.message);
      fetchRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (userId, userName) => {
    if (!confirm(`Are you sure you want to reject ${userName}'s request?`)) return;

    setProcessing(userId);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.rejectRole(userId);
      setSuccess(response.message);
      fetchRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <CardTitle className="text-2xl">Pending Role Requests</CardTitle>
                <CardDescription>Review and approve manager role requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                          No pending requests
                        </TableCell>
                      </TableRow>
                    ) : (
                      requests.map((request) => (
                        <TableRow key={request._id}>
                          <TableCell className="font-medium">{request.name}</TableCell>
                          <TableCell className="text-gray-600">{request.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{request.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-700">
                              {request.requestedRole}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(request._id, request.name, request.requestedRole)}
                                disabled={processing === request._id}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                {processing === request._id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(request._id, request.name)}
                                disabled={processing === request._id}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}