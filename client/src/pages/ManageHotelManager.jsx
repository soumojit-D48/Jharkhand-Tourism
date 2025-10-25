

import { useState, useEffect } from 'react';
import { Trash2, Users, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { apiService } from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

export default function ManageHotelManager() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      setError('');
      // Assuming you need to add this API endpoint to fetch all managers
      const response = await apiService.getAllManagers();
      setManagers(response.managers || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch managers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (manager) => {
    setManagerToDelete(manager);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!managerToDelete) return;

    setProcessing(managerToDelete._id);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.removeManager(managerToDelete._id);
      setSuccess(response.message || `Manager ${managerToDelete.name} removed successfully`);
      setDeleteDialogOpen(false);
      setManagerToDelete(null);
      
      // Refresh the list
      await fetchManagers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to remove manager');
      setDeleteDialogOpen(false);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <CardTitle className="text-2xl">Manage Managers</CardTitle>
                  <CardDescription>
                    View and manage all hotel managers
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {managers.length} Manager{managers.length !== 1 ? 's' : ''}
              </Badge>
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
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Hotels</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>No managers found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      managers.map((manager) => (
                        <TableRow key={manager._id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-600" />
                              {manager.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {manager.email}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700">
                              {manager.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(manager.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {manager.hotelCount || 0} hotel{manager.hotelCount !== 1 ? 's' : ''}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteClick(manager)}
                              disabled={processing === manager._id}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {processing === manager._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </>
                              )}
                            </Button>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Remove Manager?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to remove <strong>{managerToDelete?.name}</strong> as a manager?
              </p>
              <p className="text-red-600 font-medium">
                This will change their role back to "user" and they will lose access to manage hotels.
              </p>
              {managerToDelete?.hotelCount > 0 && (
                <p className="text-orange-600 font-medium">
                  ⚠️ This manager currently manages {managerToDelete.hotelCount} hotel(s).
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={processing}
              className="bg-red-600 hover:bg-red-700"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                'Remove Manager'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}